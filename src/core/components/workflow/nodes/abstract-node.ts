/**
 * Created by jlmayorga on 3/25/16.
 */
import {Input, Output, EventEmitter, SimpleChange, OnChanges} from '@angular/core';
import {WorkflowStep} from '../models/workflow-execution';

export class AbstractNode implements OnChanges {

  @Input()
  protected content:any;
  @Input()
  protected workflowStep:WorkflowStep;
  @Output()
  protected onSignalEvent = new EventEmitter<Object>();
  @Output()
  protected onCancelWorkflowEvt = new EventEmitter<any>();
  @Output()
  protected onSuspendWorkflowEvt = new EventEmitter<any>();

  protected data;

  constructor() {

  }

  sendSignal(signalName:string, payload:Object) {
    this.onSignalEvent.emit({signalName: signalName, payload: payload});
  }

  ngOnChanges(changes:{[key:string]:SimpleChange}) {
    if (changes['content']) {
      // On every change of the content input parameter clear the existing data and refresh it if provided
      this.data = undefined;

      if (this.content && typeof this.content === 'string') {
    	  
    	/*TODO: hot fix to scape '"' on value of formValues element*/
    	this.fixFormValuesContent();  
        this.content = this.parseJson(this.content);
        
      }

      if (this.content && this.content.data) {
        this.data = this.content.data;
      }
    }
  }

  /*TODO: hot fix to scape '"' on value of formValues element*/
  fixFormValuesContent(){
	  let formValueKeyIdx = this.content.indexOf('"formValues"');
	  let startIdx = this.content.indexOf('{',formValueKeyIdx);
	  let endIdx = this.content.indexOf('}',formValueKeyIdx);
	  let newValue = this.content.substring(startIdx,endIdx+1).replace(/"/g,'\\"');
	  this.content = this.content.substr(0,startIdx) + newValue + this.content.substr(endIdx+1);
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

  cancelWorkflow() {
    this.onCancelWorkflowEvt.emit(null);
  }

  suspendWorkflow() {
    this.onSuspendWorkflowEvt.emit(null);
  }

}
