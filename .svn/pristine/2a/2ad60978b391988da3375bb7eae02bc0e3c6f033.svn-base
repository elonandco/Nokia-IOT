import {Component} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {AlertComponent} from '../alert/alert.component';
import {LogoutComponent} from '../auth/logout.component';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Rx';
import {TOGGLE_MENU} from "../../reducers/menu.reducer";

@Component({
  selector: 'navbar-header',
  directives: [AlertComponent, LogoutComponent],
  templateUrl: '/src/core/components/header/header.component.html'
})

export class HeaderComponent{

  initWorkflow: Observable<any>;
  loggedIn:boolean = false;
  loggedIn$: Observable<any>;
  firstName: string = "";
  lastName: string = "";

  constructor(private _store:Store<any>, public _router:Router) {
    this._store = _store;
    this.initWorkflow = this._store.select('InitWorkflowReducer');
    this.initWorkflow.subscribe(data => this.onInitCompleted(data));
    this.loggedIn$ = this._store.select('AuthenticationReducer');
    this.loggedIn$.subscribe(data => this.isLoggedOut(data));
    this.dsoObs = this._store.select('DSOModelReducer');
    this.dsoObs.subscribe(data => this.updateUserInfo(data));
  }

  updateUserInfo(data){

  	if (data!= undefined && data.hasOwnProperty('firstName')){
  		this.firstName=data.firstName;
  	}
  	
  	if (data!= undefined && data.hasOwnProperty('lastName')){
  	  	this.lastName=data.lastName;
  	}
  
  }
  onInitCompleted(data){
    this.loggedIn = data.status === "completed";
  }

  isLoggedOut(data) {
    if (!data.sessionId) {
      this.loggedIn = false;
    }
  }

  toggleMenu() {
    this._store.dispatch({type:TOGGLE_MENU});
  }

  refreshDashboard() {
    location.reload();
  }

  goToDashboard() {
    var link = ['Dashboard'];
    this._router.navigate(link);
  }

}
