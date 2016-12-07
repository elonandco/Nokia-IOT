import {Component,OnInit,OnDestroy,ElementRef,Renderer} from "@angular/core";
import {Router, RouteData} from "@angular/router-deprecated";
import {Store} from '@ngrx/store';
import {DataTable} from 'primeng/primeng';
import {Column} from 'primeng/primeng';
import {FirmwareService} from '../../../../custom/components/dashboard/firmware/firmware-widget-service';
import {DynamicRouteConfiguratorService} from "../../../../core/services/dynamic-route-configurator.service";
import {WorkflowComponent} from '../../../../core/components/workflow/workflow.component';
import {Observable} from 'rxjs/Observable';
import {DASHBOARD_SHOW} from '../../../../core/reducers/dashboard.reducer';


@Component({
  selector: 'firmware-detail',
  templateUrl: '/src/custom/components/dashboard/firmware/firmware-detail.component.html',
  directives: [DataTable, Column, WorkflowComponent],
  providers: [FirmwareService]
})
  
export class FirmwareDetailComponent implements OnInit, OnDestroy{
  title:string = 'Firmware Details';
  _allFirmware: Object[] = [];
  private paginationDetails:String = ""
  dsoObs:Observable<any>;

  workflowConvetextObs:Observable<any>;

  componentType:string = "";
  dsoObsubscription: any;
  private type:string;
  workflowName:string;
  toN:number = 0;
  rowsXPage:number=10;
  first:number= 0;

  addFirmwareOperation:Object;
  workflowOperations:Array<any> = [];
  refreshOperation:Object;

  workflowActive:boolean = false;
  firmwareActive:boolean = false;
  componentActive:boolean = false;
  workflowHidden:boolean = false;

  constructor(private _router:Router, public _firmwareService: FirmwareService, private _store:Store<any>, 
		  private data:RouteData,
		  private _drc:DynamicRouteConfiguratorService,
		  private el: ElementRef,
		  private renderer: Renderer) {
    this.type = data.get('type');
    this.dsoObs = _store.select('DSOModelReducer');
    this.workflowConvetextObs = _store.select('WorkflowContextReducer');
    this.dsoObsubscription = this.dsoObs.subscribe((data:any)=> {
      let services = _.find(data.domains.domain, function (domain:any) {
        return domain.id === "Widgets"
      }).services.service;
      let Firmwares = _.find(services, function (service:any) {
        return service.id === "Firmwares"
      });

      if (Firmwares != undefined && Firmwares.operations != undefined){
        var operations = _.cloneDeep(Firmwares.operations.operation);
        this.refreshOperation = _.remove(operations,function(operation){
          return operation.attributes.hasOwnProperty('type') && operation.attributes.type === "refresh_details"
        })[0];
        this.addFirmwareOperation = _.remove(operations,function(operation){
              return operation.attributes.hasOwnProperty('type') && operation.attributes.type === "add_operation"
        })[0];
        _.remove(operations,function(operation){
            return operation.attributes.hasOwnProperty('type') && operation.attributes.type === "refresh_widget"
        })[0];
        this.workflowOperations = operations;
      } else {
        console.log("Widget::Firmware Doesn't contained expected operations")
      }
    },
    error => {

    })
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
      case 'Firmwares':
      {
        this.workflowActive = false;
        this.initDetails();
        this.firmwareActive = true;
        this.componentActive = true;
        this.componentType = 'Firmwares';
        break;
      }
    }
  }

  updatePagination(firmwares){
    if(this.status !== 'FAIL'){
      if(firmwares.length > 0){
        let toN = firmwares.length > 10 ? 10 : firmwares.length;
        this.paginationDetails = "Showing 1 to " + toN + " of " + firmwares.length;
      } else {
        this.paginationDetails = "No record found";
      }
    }
  }

  initDetails(){
    let _tempGroups = this._firmwareService.getfirmwareList();
    this._allFirmware = _.orderBy(_tempGroups, ["Date Added"], ["desc"])
    this.status = this._firmwareService.listStatus;
    this.message = this._firmwareService.listMessage;
    this.resultStatus = this._firmwareService.listResultStatus;
    this.resultCode = this._firmwareService.listResultCode;
    this.resultMessage = this._firmwareService.listResultMessage;
    this.updatePagination(this._allFirmware)
    
    setTimeout(function(nativeElement,render){
   	  let filters = nativeElement.querySelectorAll('input.ui-column-filter');
   	  let headers = nativeElement.querySelectorAll('span.ui-column-title')
   	  for(var x=0; x<filters.length;x++){
   		  render.setElementAttribute(filters[x],"placeHolder","Filter " + headers[x].innerText);	 
   	  }
    },1000,this.el.nativeElement,this.renderer);
    
  }
  
  updatePage(firmwares){
    setTimeout(function(){
      this.updatePagination(firmwares);
    },1000)
  }

  onOperationClick(evt:Event) {
    this.hideComponent();
    this.runWorkflow(evt.target.getAttribute('operation'))
  }
  
  hideComponent(){
    switch (this.type) {
      case 'Firmwares':
        {
          this.firmwareActive = false;
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

  launchAddFirmware() {
    console.log('launching add firmware flow');
    this._router.navigate(['EAP_IOT_ADD_FIRMWARE']);
  }

  onRefresh(evt:Event){
    this.hideComponent();
    this.runWorkflow(this.refreshOperation.operationName);
  }

  ngOnDestroy(){
    console.log("Destroying firmware-details.compoent::: unsubscribe");
    this.dsoObsubscription.unsubscribe();
  }

  handlePageSelect(event){
	this.rowsXPage = event.rows;
	this.first = event.first;
    this.toN = event.first + this.rowsXPage;
    if (this.toN > this._allFirmware.length){
      this.toN = this._allFirmware.length;
    }
    this.paginationDetails = "Showing " + (event.first + 1) + " to " + this.toN + " of " + this._allFirmware.length
  }

  onSort(event,datatable){
	  datatable.paginate({rows: this.rowsXPage, first : this.first });
  }
  
}
