import {Component,OnInit,OnDestroy} from "@angular/core";
import {Router, RouteData} from "@angular/router-deprecated";
import {Store} from '@ngrx/store';
import {DataTable} from 'primeng/primeng';
import {Column} from 'primeng/primeng';
import {ReportService} from '../../../../custom/components/dashboard/campaigns/detailed-report-service';
import {DynamicRouteConfiguratorService} from "../../../../core/services/dynamic-route-configurator.service";
import {WorkflowComponent} from '../../../../core/components/workflow/workflow.component';
import {Observable} from 'rxjs/Observable';
import {DASHBOARD_SHOW} from '../../../../core/reducers/dashboard.reducer';


@Component({
  selector: 'detailed-report-detail',
  templateUrl: '/src/custom/components/dashboard/campaigns/detailed-report-detail.component.html',
  directives: [DataTable, Column, WorkflowComponent],
  providers: [ReportService]
})
  
export class DetailedReport implements OnInit, OnDestroy{
  title:string = 'Detailed Reports';
  _allReports: Object[] = [];
  private paginationDetails:String = ""
  dsoObs:Observable<any>;

  workflowConvetextObs:Observable<any>;

  componentType:string = "";
  dsoObsubscription: any;
  private type:string;
  workflowName:string;
  campaignName:string;
  numFailedDevices:string;

  viewCampaignOperation:Object;
  workflowOperations:Array<any> = [];
  refreshOperation:Object;

  workflowActive:boolean = false;
  reportActive:boolean = false;
  componentActive:boolean = false;
  workflowHidden:boolean = false;

  constructor(private _router:Router, public _reportService: ReportService, private _store:Store<any>, data:RouteData,private _drc:DynamicRouteConfiguratorService) {
    this.type = data.get('type');
    this.dsoObs = _store.select('DSOModelReducer');
    this.workflowConvetextObs = _store.select('WorkflowContextReducer');
    this.dsoObsubscription = this.dsoObs.subscribe((data:any)=> {
      let services = _.find(data.domains.domain, function (domain:any) {
        return domain.id === "Widgets"
      }).services.service;
      let Campaigns = _.find(services, function (service:any) {
        return service.id === "Campaigns"
      });

      if (Campaigns != undefined && Campaigns.operations != undefined){
        var operations = _.cloneDeep(Campaigns.operations.operation);
        this.refreshOperation = _.remove(operations,function(operation){
          return operation.attributes.hasOwnProperty('type') && operation.attributes.type === "refresh_details"
        })[0];
        this.viewCampaignOperation = _.cloneDeep(operations,function(operation){
            return operation.attributes.hasOwnProperty('type') && operation.attributes.type === "details"
        })[0];
        _.remove(operations,function(operation){
            return operation.attributes.hasOwnProperty('type') && operation.attributes.type === "refresh_widget"
        })[0];
        this.workflowOperations = operations;
      } else {
        console.log("Widget::Campaigns Doesn't contained expected operations");
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
      case 'Campaigns':
      {
        this.workflowActive = false;
        this.initDetails();
        this.reportActive = true;
        this.componentActive = true;
        this.componentType = 'Firmwares';
        break;
      }
    }
  }

  updatePagination(reports){
    if(this.status !== 'FAIL'){
      if(reports){
        let toN = reports.length > 10 ? 10 : reports.length;
        this.paginationDetails = "Showing 1 to " + toN + " of " + reports.length;
      } else {
        this.paginationDetails = "No record found";
      }
    }
  }

  initDetails(){
    let _tempGroups = this._reportService.getReportList();
    this._allReports = _tempGroups;
    //use if the table needs to be sorted. This would sort by manufacturer
    //this._allReports = _.orderBy(_tempGroups, ["Manufacturer"], ["desc"]);
      this.status = this._reportService.listStatus;
      this.message = this._reportService.listMessage;
      this.resultStatus = this._reportService.listResultStatus;
      this.resultCode = this._reportService.listResultCode;
      this.resultMessage = this._reportService.listResultMessage;
      this.numFailedDevices = this._reportService.campaignReportJSON ? this._reportService.campaignReportJSON.numFailedDevices : 0;
      this.campaignName = this._reportService.campaignReportJSON ? this._reportService.campaignReportJSON.campaignName : "";
      this.updatePagination(this._allReports);
  }
  
  updatePage(reports){
    setTimeout(function(){
      this.updatePagination(reports);
    },1000)
  }

  onOperationClick(evt:Event) {
    this.hideComponent();
    this.runWorkflow(evt.target.getAttribute('operation'))
  }
  
  hideComponent(){
    switch (this.type) {
      case 'Reports':
        {
          this.reportActive = false;
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
    console.log('launching view campaign flow');
    this._router.navigate(['EAP_IOT_VIEW_CAMPAIGNS']);
  }

  onRefresh(evt:Event){
    this.hideComponent();
    this.runWorkflow(this.refreshOperation.operationName);
    //this.runWorkflow('EAP_IOT_VIEW_REPORTS');
  }

  ngOnDestroy(){
    console.log("Destroying capaign-details.compoent::: unsubscribe");
    this.dsoObsubscription.unsubscribe();
  }

  handlePageSelect(event){
    let toN = event.first + event.rows;
    if (toN > this._allReports.length){
      toN = this._allReports.length;
    }
    this.paginationDetails = "Showing " + (event.first + 1) + " to " + toN + " of " + this._allReports.length
  }

}
