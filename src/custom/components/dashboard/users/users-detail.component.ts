import {Component,OnInit} from "@angular/core";
import {Router, RouteData} from '@angular/router-deprecated';
import {Store} from '@ngrx/store';
import {DataTable} from 'primeng/primeng';
import {Column} from 'primeng/primeng';
import {WorkflowComponent} from '../../../../core/components/workflow/workflow.component';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'users-detail',
  templateUrl: '/src/custom/components/dashboard/users/users-detail.component.html',
  directives: [DataTable, Column, WorkflowComponent]
})

export class UsersDetailComponent implements OnInit{
  title:string = 'Users Details';
  people: Object[] = [];
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

  constructor(private _router:Router, private _store:Store<any>, data:RouteData) {
    //this.people = _usersService.getUsers();

    this.type = data.get('type');
    this.dsoObs = _store.select('DSOModelReducer');
    this.workflowConvetextObs = _store.select('WorkflowContextReducer');
    this.dsoObs.subscribe((data:any)=> {
      let services = _.find(data.domains.domain, function (domain:any) {
        return domain.id === "Menu"
      }).services.service;
      let Users = _.find(services, function (service:any) {
        return service.id === "UsersMenu"
      });

      if (Users != undefined && Users.operations != undefined){
        var operations = _.cloneDeep(Users.operations.operation);
        this.refreshOperation = _.remove(operations,function(operation){
          return operation.attributes.hasOwnProperty('type') && operation.attributes.type === "refresh"
        })[0];
        this.workflowOperations = operations;
      } else {
        console.log("Widget::Users Doesn't contained expected operations")
      }
    },
    error => {

    })
  }

  ngOnInit() {
    let UsersDetail = _.find(this.workflowOperations, function (operation) {
      return operation.id === "EAP_IOT_VIEW_USERS"
    });

    if (this.workflowOperations != undefined && UsersDetail != undefined){
      this.workflowName = "EAP_IOT_VIEW_USERS";
      this.workflowActive = true;
    } else {
      console.log("Widget::Users workflowOperations missing")
    }
  }

  isDone(evt) {
    $('select.ui-paginator-rpp-options').wrap('<div class="paginator-options-container"></div>');
    this.people = this._store.value.WorkflowContextReducer.globalContext.userJSON;
    this.workflowHidden = true;
    switch (this.type) {
      case 'Users':
      {
        this.workflowActive = false;
        //this.initCampaigns();
        this.campaignActive = true;
        this.componentActive = true;
        this.componentType = 'Users';
        break;
      }
    }
  }
}
