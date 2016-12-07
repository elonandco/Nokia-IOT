import {Injectable,EventEmitter} from '@angular/core';
import {SSCWorkflowExecutionService} from '../../services/ssc-workflow-execution.service';
import {WorkflowExecution} from './models/workflow-execution';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {WF_CTX_ACTION_UPDATE} from '../../reducers/workflow-context.reducer';
import {
	  DSO_MODEL_ACTION_ADD_OR_UPDATE_ACCOUNT,
	  DSO_MODEL_ACTION_ADD_OR_UPDATE_DOMAIN,
	  DSO_MODEL_ACTION_ADD_OR_UPDATE_SERVICE,
	  DSO_MODEL_ACTION_ADD_OR_UPDATE_OPERATION
	} from '../../reducers/dso-model.reducer';

export enum WorkflowExecutionStatus{
  NONE = -1,
  STARTING = 0,
  RUNNING = 1,
  TERMINATED = 2,
  ERROR = -2
}

@Injectable()
export class WorkflowLauncherService{
	
  private workflowName:string;
  private workflowParameters:any;
  private headless:boolean = false;
  public isDone:EventEmitter  = new EventEmitter<any>();
  public processBreadCrumbs:EventEmitter  = new EventEmitter();
  
  
  private _executionStatus:WorkflowExecutionStatus = WorkflowExecutionStatus.NONE;	
  public _wfExec:WorkflowExecution;	

  constructor(private _wfExecService:SSCWorkflowExecutionService, private _store:Store<any>) {
    this._wfExec = new WorkflowExecution();
  }

  /**
   * Subscribes to any event returned by the workflow execution service and
   * updates the status of this workflow if a matching event is found
   */
  private listenForEvents():void {
    let wfExecutions:Observable<any> = this._store.select('WorkflowExecutionReducer');
    wfExecutions.subscribe(
      (wfExecs:Array < WorkflowExecution >) => {
        if (wfExecs && wfExecs.length > 0) {
          wfExecs.map((wfExec:WorkflowExecution)=> {
            if (this._wfExec.id == wfExec.id) {
              this._wfExec = wfExec;
              this.processBreadCrumbs.emit();
              
              if (!this._wfExec.step){
            	  console.log("No Step information found on Workflow response");
              }
              
              this._wfExec.step.content = this.parseJson(this._wfExec.step.content);

              // Add the data passed by data event to the workflow context
              if (this._wfExec.step.template === 'dataevent') {
                let data = this._wfExec.step.content.data;

                if (data && data.modelUpdateEventType) {
                  this.processModelUpdateEvent(data);
                } else {
                  this._store.dispatch({type: WF_CTX_ACTION_UPDATE, payload: data});
                }
                this.handleSignal({signalName: 'next', payload: null});
              }
              if (this._wfExec.step.done) {
                this._executionStatus = WorkflowExecutionStatus.TERMINATED;
                this.isDone.emit(this._wfExec.data);
              }
              this._executionStatus = WorkflowExecutionStatus.RUNNING;
            }
          });
        }
      },
      (error)=> {
        console.log("Error: " + error);
      }
    );
  }

  public launchWorkflow(workflowName: string, workflowParameters: Object){
    this._wfExec.name = workflowName;
    this.workflowParameters = workflowParameters;
    this._wfExec.subscriberId = this._store._value.AuthenticationReducer.subscriberId;

    if (this._store._value.WorkflowContextReducer.globalContext && 
    		this._store._value.WorkflowContextReducer.globalContext.groupDataJSON){
    	/*order is important, lets overwrite any value on the store from any new value on workflowParameters*/
    	this.workflowParameters = Object.assign({}, this._store._value.WorkflowContextReducer.globalContext.groupDataJSON, 
    									this.workflowParameters);
    }
    
    this._wfExec.breadcrumbs = true;
    this.listenForEvents();
    this.startWorkflow(this.workflowParameters);
	  
  }
  
  /**
   * Launches a new workflow passing the workflowParameters parameter as start parameters.
   * @param workflowParameters
   */
  private startWorkflow(workflowParameters:Object):void {
	this._executionStatus = WorkflowExecutionStatus.STARTING;
    this._wfExecService.startWorkflow(this._wfExec, workflowParameters).subscribe(
      response => {
        this._wfExec.id = response.workflow.id;
      },
      error => {
        console.log("Error while starting workflow: " + error)
      }
    );
  }

  private processModelUpdateEvent(data) {
	    let modelUpdateEventType = data.modelUpdateEventType;
	    let modelUpdateEvent = data.modelUpdateEvent;
	    let actionType = null;
	    if (modelUpdateEventType && modelUpdateEvent) {
	      switch (modelUpdateEventType) {
	        case "account":
	          actionType = DSO_MODEL_ACTION_ADD_OR_UPDATE_ACCOUNT;
	          break;
	        case "domain":
	          actionType = DSO_MODEL_ACTION_ADD_OR_UPDATE_DOMAIN;
	          break;
	        case "service":
	          actionType = DSO_MODEL_ACTION_ADD_OR_UPDATE_SERVICE;
	          break;
	        case "operation":
	          actionType = DSO_MODEL_ACTION_ADD_OR_UPDATE_OPERATION;
	          break;
	        default:
	          console.log('Unsupported action type: ' + modelUpdateEventType);
	          return;
	      }
	      if (actionType) {
	        this._store.dispatch({type: actionType, payload: modelUpdateEvent});
	      }
	    }
	  }

  
  /**
   * Sends a signal and its payload to the workflow engine.
   * @param signal
   */
  public handleSignal(signal:{signalName:any, payload:Object}):void {
    this._wfExecService.sendSignal(this._wfExec, signal.signalName, signal.payload).subscribe(
      response => {
        //TODO: This kind of request doesn't provide a response, handle status != 200
        return;
      }, error => {
        //TODO: Handle errors
      });
  }
  
  /**
   * Cancel workflow execution
   */
  private cancelWorkflow() {
    console.log("Cancelling workflow execution");
    this._wfExecService.cancelWorkflow(this._wfExec).subscribe(
      response => {
        //TODO: This kind of request doesn't provide a response, handle status != 200
        return;
      }, error => {
        //TODO: Handle errors
      });
  }

  
  /**
   * Suspend workflow execution
   */
  private suspendWorkflow() {
    console.log("Suspending workflow execution");
    this._wfExecService.suspendWorkflow(this._wfExec).subscribe(
      response => {
        //TODO: This kind of request doesn't provide a response, handle status != 200
        return;
      }, error => {
        //TODO: Handle errors
      });
  }

  /**
   * Parses json data from the workflow response
   * @param jsonString
   * @returns {any}
   */
  private parseJson(jsonString):Object {
    try {
      let jsonObject = JSON.parse(jsonString);
      if (jsonObject && jsonObject.data && typeof (jsonObject.data) === 'string') {
        jsonObject.data = this.parseJson(jsonObject.data);
      }
      return jsonObject;
    } catch (e) {
      return jsonString;
    }
  }
	
}