import {Component, ComponentRef, Input, OnDestroy} from '@angular/core';
import {WidgetContentComponent} from './widget-content.component';
import {WidgetSettingsComponent} from './widget-settings.component';
import {Store} from '@ngrx/store';
import {WorkflowComponent} from 'src/core/components/workflow/workflow.component';

import {Observable} from "rxjs/Observable";
import {TOGGLE_WIDGET_VIEW} from '../../../reducers/user-preferences.reducer';

export abstract class WidgetComponent {

  title:string = "Generic Widget";
  _ref:ComponentRef<any>;
  isActive:boolean = false;
  isSelected:boolean = false;
  private displaySettings:boolean = false;
  type:string = "";
  dataObjectName:string;

  refreshing:boolean = false;
  fullrefresh:boolean = false;
  refreshOperation:Object;
  workflowName:string;

  workflowActive:boolean = false;
  userPrefObs:Observable<any>;
  dsoObs:Observable<any>;
  workflowContextObs:Observable<any>;
  dsoObsubscription: any;
  userPrefObsubscription: any;


  @Input()
  isHidden:boolean = true;
  widget_data;

  constructor(private _store:Store<any>)
  {
    this.userPrefObs = _store.select('UserPreferencesReducer');
    this.userPrefObsubscription = this.userPrefObs.subscribe(
      (data : any)=>{
         var type = this.type;
         let w = _.find(this._store.value.UserPreferencesReducer.widgets,function(widget: any){
           return widget.component === type;
         });

         if(w){
           if(w.previousHidden && this.isHidden){
             document.getElementById('widgetList').insertBefore(this._ref._hostElement.nativeElement,document.getElementsByClassName('widget')[0].parentNode);
             //A small delay is required so that the element has time to move from the code above. If you don't wait, the widget unhide CSS will be off
             setInterval(() =>{
               this.isHidden = w.isHidden;
             },5);
             this.onUnhide();
           }
         }
      },
        error=>{

      }
    );

    this.dsoObs = _store.select('DSOModelReducer');
    this.workflowContextObs = _store.select('WorkflowContextReducer');
  }

  ngOnInit(){
    this.type = this._ref._componentType.name;
    console.log("Widget OnInit subscribing:::" + this.type);
    this.dsoObsubscription = this.dsoObs.subscribe((data:any)=> {
        let services = _.find(data.domains.domain, function (domain:any) {
          return domain.id === "Widgets"
        }).services.service;
        var type = this.type;
        let campaigns = _.find(services, function (service:any) {
          return service.component === type;
        });
        /*TODO: UI:Jorge:: Widgets CAN NOT BRING operation for Campaign*/
        if (campaigns == undefined){
        	console.log("Widget::Doesn't contained " type + " service data");
        } else {
	        if (campaigns.operations != undefined){
		        var operation = _.cloneDeep(campaigns.operations.operation);
		        this.refreshOperation = _.remove(operation,function(operation){
		          return operation.attributes.hasOwnProperty('type') && operation.attributes.type === "refresh_widget"
		        })[0];
	        } else {
	        	console.log("Widget:: " + type + "  Doesn't contained expected operations")
	        }
	      }
    	},
        error => {
        	
      }
    );

    this.workflowContextObs.subscribe(data=> {
    	/*It is fired when the refresh on widget is done*/
        if(data.globalContext && data.globalContext.hasOwnProperty(this.dataObjectName)){
          this.widget_data = data.globalContext[this.dataObjectName];
          this.refreshing = false;
          this.workflowActive = false;
        }
      },
        error => {

      }
    )

  }

  onUnhide(){}

  onRefresh():void {
    this.refreshing = true;
    this.workflowName = this.refreshOperation.operationName;
    this.workflowActive = true;
    
    /*TODO: may we need to remove the actual dataobject on refresh from the store,  to don't get updated when 
     * other widget finish its refrsh since any workflow can active the 'workflowContextObs'*/

    if(this._store.value.WorkflowContextReducer.globalContext 
    	&& this._store.value.WorkflowContextReducer.globalContext.hasOwnProperty(this.dataObjectName)){
    	delete this._store.value.WorkflowContextReducer.globalContext[this.dataObjectName];
    }
    
  }

  showSettings():void {
    this.displaySettings = true;
  }

  isDone(evt:Event){

  }

  close():void {
    if(this._store){
      let c =  this._ref._componentType.name.match(/^(.*)Widget.*/);
      if(c.length > 0){
        this.isSelected = false;
        this.isActive = false;
        this._store.dispatch({type:TOGGLE_WIDGET_VIEW,payload:{'widget':c[1]}});
        this.isHidden = true;
      }
    }else{
      console.log("Component that implements this component did not pass the store during construction. Example: super(this)")
    }
  }

  cancelSettings():void{
    this.displaySettings = false;
  }

  abstract saveSettings():void;
  
  abstract showDetail():void;

  hideSettings():void {
    this.displaySettings = false;
  }

  private onMouseEnter() {
    this.isActive = true;

  }

  private onMouseLeave() {
    this.isActive = false;
  }

  private onClick() {
    this.isSelected = !this.isSelected;
  }
  
  ngOnDestroy(){
	  console.log("unsubscribing from ngOnDEstroy:::" + this.type);
	  this.dsoObsubscription.unsubscribe();
	  this.userPrefObsubscription.unsubscribe();
  }
  
}
