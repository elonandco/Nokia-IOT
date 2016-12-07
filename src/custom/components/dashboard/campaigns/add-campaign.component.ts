import {Component} from '@angular/core';
import {Router, RouteData} from '@angular/router-deprecated';
import {WorkflowComponent} from '../../../../core/components/workflow/workflow.component';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'firmware-detail',
  templateUrl: '/src/custom/components/dashboard/campaigns/add-campaign.component.html',
  //directives: [DataTable,Column]
  directives: [WorkflowComponent]
})

export class AddCampaignComponent implements OnInit{
  title:string = 'Add Campaign';

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

title:string = 'Add Campaign';
columnsArray:Array<any> = [];
columnData:Array<any> = [];

  constructor(private _router:Router, private _store:Store<any>, data:RouteData) {
	  this.type = data.get('type');
	    this.dsoObs = _store.select('DSOModelReducer');
	    this.workflowConvetextObs = _store.select('WorkflowContextReducer');
	    this.dsoObs.subscribe((data:any)=> {
	        let services = _.find(data.domains.domain, function (domain:any) {
	          return domain.id === "Menu"
	        }).services.service;
	        let Campaigns = _.find(services, function (service:any) {
	          return service.id === "CampaignsMenu"
	        });

	        if (Campaigns != undefined && Campaigns.operations != undefined){
		        var operations = _.cloneDeep(Campaigns.operations.operation);
            this.refreshOperation = _.remove(operations,function(operation){
              return operation.attributes.hasOwnProperty('type') && operation.attributes.type === "refresh"
            })[0];
            _.remove(operations,function(operation){
              return operation.attributes.hasOwnProperty('type') && operation.attributes.type === "refresh_widget"
            })[0];
		        this.workflowOperations = operations;
		        } else {
	        	console.log("Widget::Campaigns Doesn't contained expected operations")

	        }

	      },
	      error => {

	      }
	    )
  }

  ngOnInit() {
    let AddCampaign = _.find(this.workflowOperations, function (operation) {
      return operation.id === "EAP_IOT_ADD_CAMPAIGN"
    });

	  if (this.workflowOperations != undefined && AddCampaign != undefined){
      this.workflowName = "EAP_IOT_ADD_CAMPAIGN";
      this.workflowActive = true;
	  } else {
		  console.log("Widget::Campaigns workflowOperations missing")
	  }
  }

  isDone(evt) {
	    this.workflowHidden = true;
	    switch (this.type) {
	      case 'Campaigns':
	      {
	        this.workflowActive = false;
	        //this.initCampaigns();
	        this.campaignActive = true;
	        this.componentActive = true;
	        this.componentType = 'Campaigns';
	        break;
	      }
	    }

	    let link = ['Dashboard'];
	    this._router.navigate(link);
	  }
  isCanceled(){
	  let link = ['Dashboard'];
	  this._router.navigate(link);
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
