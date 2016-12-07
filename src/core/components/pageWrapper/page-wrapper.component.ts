import {Component} from '@angular/core';
import {Router, RouteData} from '@angular/router-deprecated';
import {Datatable} from '../datatable/datatable.component';
import {WorkflowComponent} from '../workflow/workflow.component';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'campaign-detail',
  templateUrl: '/src/core/components/pagewrapper/page-wrapper.component.html',
  directives: [Datatable, WorkflowComponent]
})

export class pageWrapper {

  dsoObs:Observable<any>;
  workflowConvetextObs:Observable<any>;

  componentType:string = "";
  private type:string;
  workflowName:string;

  workflowOperations:Array<any> = [];
  refreshOperation:Object;

  workflowActive:boolean = false;
  campaignActive:boolean = false;
  componentActive:boolean = false;
  workflowHidden:boolean = false;

  title:string = 'Campaign Details';
  columnsArray:Array<any> = [];
  columnData:Array<any> = [];

  constructor(private _router:Router, private _store:Store<any>, data:RouteData) {
    this.type = data.get('type');
    this.dsoObs = _store.select('DSOModelReducer');
    this.workflowConvetextObs = _store.select('WorkflowContextReducer');
    this.dsoObs.subscribe((data:any)=> {
        let services = _.find(data.domains.domain, function (domain:any) {
          return domain.id === "Widgets"
        }).services.service;
        let campaigns = _.find(services, function (service:any) {
          return service.id === "Campaigns"
        });
        var operations = _.cloneDeep(campaigns.operations.operation);
        this.refreshOperation = _.remove(operations,function(operation){
          return operation.attributes.hasOwnProperty('type') && operation.attributes.type === "refresh"
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
      case 'Campaigns':
      {
        this.workflowActive = false;
        this.initCampaigns();
        this.campaignActive = true;
        this.componentActive = true;
        this.componentType = 'Campaigns';
        break;
      }
    }
  }

  initCampaigns() {
    this.workflowConvetextObs.subscribe(data=> {
        this.columnsArray = [
          {field: 'name', header: 'Name'},
          {field: 'type', header: 'Type'},
          {field: 'creationDate', header: 'Create Date'},
          {field: 'startDate', header: 'Start Date'},
          {field: 'endDate', header: 'End Date'},
          {field: 'finishDate', header: 'Finish Date'},
          {field: 'devices', header: 'Devices'},
          {field: 'user', header: 'User'},
          {field: 'status', header: 'Status'}
        ];
        this.columnData = data.globalContext.campaign_data;
      },
      error => {

      }
    )
  }

  onOperationClick(evt:Event) {
    this.hideComponent();
    this.runWorkflow(evt.target.getAttribute('operation'))
  }

  hideComponent(){
    switch (this.type) {
      case 'Campaigns':
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
    let link = ['Dashboard'];
    this._router.navigate(link);
  }

  onRefresh(evt:Event){
    this.hideComponent();
    this.runWorkflow(this.refreshOperation.operationName);
  }



}
