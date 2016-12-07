import {Component} from '@angular/core';
import {Router, RouteData} from '@angular/router-deprecated';
import {WorkflowComponent} from '../../../../core/components/workflow/workflow.component';
import {PolicyServices} from '../../../../custom/components/dashboard/policy/policy-services';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'add-policy',
  templateUrl: '/src/custom/components/dashboard/policy/add-policy.component.html',
  providers: [PolicyServices],
  directives: [WorkflowComponent]
})

export class AddPolicyComponent implements OnInit {
dsoObs:Observable<any>;
workflowConvetextObs:Observable<any>;

componentType:string = "";
private type:string;
workflowName:string;

workflowOperations:Array<any> = [];
refreshOperation:Object;

workflowActive:boolean = false;
componentActive:boolean = false;
workflowHidden:boolean = false;
private message:string = "";
private status:string = "";

title:string = 'Add Policy';

constructor(private _router:Router, private _store:Store<any>, data:RouteData,public _policyService: PolicyServices) {
      
      this.type = data.get('type');     
      this.dsoObs = _store.select('DSOModelReducer');
      this._policyService = _policyService;
      this._policyService.getPolicy();
      this.status = this._policyService.status;
      this.message = this._policyService.message;

      this.dsoObs.subscribe((data:any)=> {
          let services = _.find(data.domains.domain, function (domain:any) {
            return domain.id === "Menu"
          }).services.service;
          let AddPolicy = _.find(services, function (service:any) {
            return service.id === "Policy"
          });

          if (AddPolicy != undefined && AddPolicy.operations != undefined){
            var operations = _.cloneDeep(AddPolicy.operations.operation);
            this.refreshOperation = _.remove(operations,function(operation){
              return operation.attributes.hasOwnProperty('type') && operation.attributes.type === "refresh"
            })[0];
            _.remove(operations,function(operation){
              return operation.attributes.hasOwnProperty('type') && operation.attributes.type === "refresh_widget"
            })[0];
            this.workflowOperations = operations;
            } else {
            console.log("Widget::Add Policy Doesn't contained expected operations")
          }

        },
        error => {

        }
      )
  }

  ngOnInit() {
    let AddPolicy = _.find(this.workflowOperations, function (operation) {
      return operation.id === "EAP_IOT_ADD_POLICY"
    });

    if (this.workflowOperations != undefined && AddPolicy != undefined){
      this.workflowName = "EAP_IOT_ADD_POLICY";
      this.workflowActive = true;
    } else {
      console.log("Widget::Add Policy's workflowOperations missing")
    }
  }

  isDone(evt) {
      this.workflowHidden = true;
      switch (this.type) {
        case 'Policy':
        {
          this.workflowActive = false;
          this.componentActive = true;
          this.componentType = 'Policy';
          break;
        }
      }

      let link = ['Dashboard'];
      this._router.navigate(link);
    }

  onOperationClick(evt:Event) {
      this.hideComponent();
      this.runWorkflow(evt.target.getAttribute('operation'))
  }

  hideComponent(){
      switch (this.type) {
        case 'Policy':
        {
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
