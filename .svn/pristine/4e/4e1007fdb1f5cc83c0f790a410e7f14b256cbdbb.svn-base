import {Component,OnInit,OnDestroy,ElementRef,Renderer} from "@angular/core";
import {Router, RouteData} from "@angular/router-deprecated";

import {DataTable} from 'primeng/primeng';

import {Column} from 'primeng/primeng';
import {DevicesService} from '../../../../custom/components/dashboard/devices/devices-widget-service'
import {WorkflowComponent} from '../../../../core/components/workflow/workflow.component';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {DASHBOARD_SHOW} from '../../../../core/reducers/dashboard.reducer';


@Component({
  selector: 'devices-detail',
  templateUrl: '/src/custom/components/dashboard/devices/devices-detail.component.html',
  directives: [DataTable,Column,WorkflowComponent],
  providers: [DevicesService],
})

export class DevicesDetailComponent implements OnInit, OnDestroy{
 
  dsoObs:Observable<any>;
  //workflowConvetextObs:Observable<any>;
  
  componentType:string = "";
  private type:string;
  workflowName:string;
  toN:number = 0;
  rowsXPage:number=10;
  first:number= 0;
  
  workflowOperations:Array<any> = [];
  refreshOperation:Object;
  addDeviceOperation:Object;
  
  workflowActive:boolean = false;
  campaignActive:boolean = false;
  componentActive:boolean = false;
  workflowHidden:boolean = false;
  headless:boolean = true;
  
  title:string = 'Devices Details';
  _devices: Object[] = [];
  private paginationDetails:String = "Showing 1 ";

  dsoObsubscription: any;
  private status:string = "";
  private message:string = "";
  
  
  constructor(private _router:Router, public _devicesService: DevicesService, 
		  private _store:Store<any>, data:RouteData,
		  private el: ElementRef,
		  private renderer: Renderer) {
	  this.type = data.get('type');
	    this.dsoObs = _store.select('DSOModelReducer');
	    //this.workflowConvetextObs = _store.select('WorkflowContextReducer');
	    this.dsoObsubscription = this.dsoObs.subscribe((data:any)=> {
	        let services = _.find(data.domains.domain, function (domain:any) {
	          return domain.id === "Widgets"
	        }).services.service;
	        let campaigns = _.find(services, function (service:any) {
	          return service.id === "Devices"
	        });
	        var operations = _.cloneDeep(campaigns.operations.operation);
	        this.refreshOperation = _.remove(operations,function(operation){
	          return operation.attributes.hasOwnProperty('type') && operation.attributes.type === "refresh_details"
	        })[0];
	        this.addDeviceOperation = _.remove(operations,function(operation){
		          return operation.attributes.hasOwnProperty('type') && operation.attributes.type === "add_operation"
		    })[0];
	        _.remove(operations,function(operation){
	          return operation.attributes.hasOwnProperty('type') && operation.attributes.type === "refresh_widget"
	        })[0];

	        this.workflowOperations = operations;

	      },
	      error => {

	      }
	    )
  }

  ngOnInit() {
	this.workflowName = _.find(this.workflowOperations, function (operation) {
	    return operation.attributes.hasOwnProperty('type') && operation.attributes.type === "details";
	  }).operationName;
	  this.workflowActive = true;
  }
  
  isDone(evt) {
    this.workflowHidden = true;
    switch (this.type) {
      case 'Devices':
      {
        this.workflowActive = false;
        this.initDetails();
        this.campaignActive = true;
        this.componentActive = true;
        this.componentType = 'Devices';
        break;
      }
    }
  }
  
  initDetails(){
	this._devices = this._devicesService.getDevicesList();
	this.status = this._devicesService.listStatus;
    this.message = this._devicesService.listMessage;
    
    if (this._devices.length > 0)  {
    	let toN = this._devices.length > 10 ? 10 : this._devices.length; 
    	this.paginationDetails =  "Showing 1 " + " to " + toN + " of " + this._devices.length;
    } else {
    	this.paginationDetails =  "No record found";
    }
    
    setTimeout(function(nativeElement,render){
   	 let filters = nativeElement.querySelectorAll('input.ui-column-filter');
   	 let headers = nativeElement.querySelectorAll('span.ui-column-title')
   	 for(var x=0; x<filters.length;x++){
   		 render.setElementAttribute(filters[x],"placeHolder","Filter " + headers[x].innerText);	 
   	 }
   },1000,this.el.nativeElement,this.renderer);
    
  }
  
  onOperationClick(evt:Event) {
    this.hideComponent();
    this.headless = false;
    this.componentActive = false;
    this.runWorkflow(evt.target.getAttribute('operation'))
    
  }
  
  hideComponent(){
    switch (this.type) {
      case 'Devices':
	      {
	        this.campaignActive = false;
	        this.componentActive = false;
	        break;
	      }
	}
  }
  
  runWorkflow(operation:string){
	this.workflowName = operation;
    this.workflowHidden = false;
    this.workflowActive = true;
    
  }

  onClose(evt:Event) {
	  
    this._store.dispatch({type: DASHBOARD_SHOW});
	  
    let link = ['Dashboard'];
    this._router.navigate(link);
  }

  onRefresh(evt:Event){
    this.hideComponent();
    this.headless = true;
    this.runWorkflow(this.refreshOperation.operationName);
  }

  ngOnDestroy(){
	  console.log("Destroying devices-details.compoent::: unsubscribe");
	  this.dsoObsubscription.unsubscribe();
  }
  
  handlePageSelect(event){
	this.rowsXPage = event.rows;
	this.first = event.first;
    this.toN = event.first + this.rowsXPage;
    if (this.toN > this._devices.length){
      this.toN = this._devices.length;
    }
	this.paginationDetails =  "Showing " + (event.first + 1) + " to " + toN + " of " + this._devices.length;
  }
  
  onSort(event,datatable){
	  datatable.paginate({rows: this.rowsXPage, first : this.first });
  }
  
}
