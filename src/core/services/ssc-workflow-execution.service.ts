/**
 * Created by jlmayorga on 3/30/16.
 */
import {Injectable} from '@angular/core';
import {RequestOptions, Headers, Http, Response} from '@angular/http';
import {AppConfigurationService} from './app-configuration.service';
import {Observable} from 'rxjs/Observable';
import {WorkflowExecution, WorkflowSignal} from '../components/workflow/models/workflow-execution';
import {DSOModel} from '../models/dso.model';
import {Store} from '@ngrx/store';
import {DSO_MODEL_ACTION_UPDATE} from '../reducers/dso-model.reducer';
import {WF_EXEC_ACTION_ADD_OR_UPDATE, WF_EXEC_COMPLETE} from '../reducers/workflow-execution.reducer';
import {AuthenticationModel} from '../models/authentication.model';
import {Router} from '@angular/router-deprecated';
import {LOGOUT} from '../reducers/authentication.reducer';

@Injectable()
export class SSCWorkflowExecutionService {

  private options:RequestOptions = new RequestOptions({
    headers: new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  });

  private getOptions:RequestOptions = new RequestOptions({
    headers: new Headers({
      'Accept': 'application/json'
    })
  });

  constructor(private _http:Http, private _cfgService:AppConfigurationService, private _store:Store<any>, private _router:Router) {
    this._store = _store;
    this._store.select('AuthenticationReducer').subscribe(
      (data:AuthenticationModel)=> {
        if (data.sessionId) {
          this.getEvents();
        }
      },
      (error)=> {
      }
    );

  }

  /**
   * Retrieves events from the SSC Rest API
   * @returns {ConnectableObservable<any>}
   */
  private getEvents() {
    Observable.interval(this._cfgService.getPollingInterval()).switchMap(()=> this._http.get(this._cfgService.getServerUrl() + "/ssc/1.0/events?id=" + this._store._value.AuthenticationReducer.sessionId, this.getOptions))
      .map((res:Response) => {
        if (res.status === 200) {
          let response = res.json();
          for (let sscEvent of response.events.event) {
            if (sscEvent.type == 'model update') {
              let dsoModel:DSOModel = <DSOModel>sscEvent.data;
              if (dsoModel) {
                this._store.dispatch({type: DSO_MODEL_ACTION_UPDATE, payload: dsoModel});
              }
            } else if (sscEvent.type == 'execution update') {
              let regexMatch = sscEvent.href.match(/\/workflows\/(.+)/i);
              if (regexMatch && regexMatch.length === 2) {
                let eventData = sscEvent.data;
                if (eventData) {
                  let wfExec = <WorkflowExecution> eventData;
                  
                  if (wfExec && wfExec.step && wfExec.step.template != 'no_step'){
                	  this._store.dispatch({type: WF_EXEC_ACTION_ADD_OR_UPDATE, payload: wfExec});
                  }
                }
              }
            } else if (sscEvent.type == 'execution complete') {
              let regexMatch = sscEvent.href.match(/\/workflows\/(.+)/i);
              if (regexMatch && regexMatch.length === 2) {
                let payload = {id: regexMatch[1]};
                this._store.dispatch({type: WF_EXEC_COMPLETE, payload: payload});
              }
            }
          }
          return res.json();
        } else {
          //TODO: handle non 200 statuses
        }
      }).subscribe(
      ()=> {
      },
      (error)=> {
        let responseStatus = error.status;
        if (responseStatus == 401) {
          //Session expired
          this._store.dispatch({type: "@@ngrx/INIT"});
          this._store.dispatch({type: LOGOUT});
          let link = ['Login'];
          this._router.navigate(link);
        }
      });
  }

  getSuspendedWorkflows() {

  }

  /**
   * Invokes the SSC Rest API to start a workflow execution
   * @param wfExec
   * @param payload
   * @returns {Observable<R>}
   */
  startWorkflow(wfExec:WorkflowExecution, payload:any) {
    let request = this.getStartWorkflowRequest(wfExec, payload);
    return this._http.post(this._cfgService.getServerUrl() + "/ssc/1.0/workflows", request, this.options).map((res:Response) => res.json());
  }

  /**
   * Sends a workflow signal to the SSC Rest API
   * @param wfExec
   * @param signalName
   * @param payload
   * @returns {Observable<R>}
   */
  sendSignal(wfExec:WorkflowExecution, signalName:string, payload:Object) {
    let request = this.getStepRequest(wfExec, signalName, payload);
    return this._http.put(this._cfgService.getServerUrl() + "/ssc/1.0/workflows/" + wfExec.id, request, this.options).map((res:Response) => res.json());
  }

  cancelWorkflow(wfExec:WorkflowExecution) {
    let request = this.getCancelRequest(wfExec);
    return this._http.put(this._cfgService.getServerUrl() + "/ssc/1.0/workflows/" + wfExec.id, request, this.options).map((res:Response) => res.json());
  }

  suspendWorkflow(wfExec:WorkflowExecution) {
    let request = this.getSuspendRequest(wfExec);
    return this._http.put(this._cfgService.getServerUrl() + "/ssc/1.0/workflows/" + wfExec.id, request, this.options).map((res:Response) => res.json());
  }

  /**
   * Builds the start workflow request for the SSC Rest API
   * @param wfExec WorkflowExecution object
   * @param payload payload to be inserted into the workflow dictionary
   * @returns {string}
   */
  private getStartWorkflowRequest(wfExec:WorkflowExecution, payload:Object) {
    if (payload) {
      wfExec.data = payload;
    }

    return JSON.stringify({workflow: wfExec});
  }

  /**
   * Builds the Step request for the SSC Rest API
   * @param wfExec Workflow Execution object
   * @param signal Signal to be sent to the workflow engine
   * @param payload payload to be inserted into the workflow dictionary
   * @returns {string}
   */
  private  getStepRequest(wfExec:WorkflowExecution, signal:string, payload:any) {
    let clonedWfExecution = <WorkflowExecution>JSON.parse(JSON.stringify(wfExec));
    let wfSignal:WorkflowSignal = new WorkflowSignal();
    wfSignal.name = signal;
    wfSignal.stepId = wfExec.step.id;
    wfSignal.data = payload ? payload : {};
    clonedWfExecution.signal = wfSignal;
    clonedWfExecution.step = null;
    clonedWfExecution.event = null;
    return JSON.stringify({workflow: clonedWfExecution});
  }

  private getCancelRequest(wfExec:WorkflowExecution):string {
    let clonedWfExecution = <WorkflowExecution>JSON.parse(JSON.stringify(wfExec));
    clonedWfExecution.signal = null;
    clonedWfExecution.step = null;
    clonedWfExecution.event = {name: 'cancel', data: {}};
    return JSON.stringify({workflow: clonedWfExecution});
  }

  private getSuspendRequest(wfExec:WorkflowExecution):string {
    let clonedWfExecution = <WorkflowExecution>JSON.parse(JSON.stringify(wfExec));
    clonedWfExecution.signal = null;
    clonedWfExecution.step = null;
    clonedWfExecution.event = {name: 'suspend', data: {}};
    return JSON.stringify({workflow: clonedWfExecution});
  }
}
