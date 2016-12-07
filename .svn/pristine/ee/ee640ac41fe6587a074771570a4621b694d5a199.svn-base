import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Store} from '@ngrx/store';
import {AbstractService} from './abstract-service';
import {AppConfigurationService} from './app-configuration.service';
import {LOGIN, LOGOUT} from '../reducers/authentication.reducer';


@Injectable()
export class AuthenticationService implements AbstractService {
 
  private isRoot:boolean;

  constructor(public http:Http,
              private config:AppConfigurationService,
              public store:Store<any>) {
  }

  onLogOut() {

  }

  validate() {
    var request = this.http.post(this.config.getServerUrl() + '/ssc/auth/1.0/validate?features=acceptEventData&beginFlowMode=ALL', null, null)
      .map(res => res.json())
      .share();

    request.subscribe(
      data => {
	  if (!data.attributes) {
          data.attributes = {};
        }
        data.attributes["isRoot"] = this.isRoot; //TODO: look for isRoot in the store
        data.attributes["beginFlowMode"] = "ALL";
        this.store.dispatch({type: LOGIN, payload: data});
      },
      err => {
      }
    );

    return request;
  }

  login(username:string, password:string, isRoot:boolean) {
    let creds = "username=" + username + "&password=" + password + "&isRoot=" + isRoot + "&features=acceptEventData&beginFlowMode=ALL";
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    var request = this.http.post(this.config.getServerUrl() + '/ssc/auth/1.0/login', creds, {
      headers: headers
    }).map(res => res.json()).share();

    request.subscribe(
      data => {
        if (!data.attributes) {
          data.attributes = {};
        }
        this.isRoot = isRoot;
        data.attributes["isRoot"] = isRoot;
        data.attributes["beginFlowMode"] = "ALL";
        this.store.dispatch({type: LOGIN, payload: data});
        this.keepAlive();
      },
      err => {

      }
    );

    return request;
  }

  logout() {
    let request = this.http.get(this.config.getServerUrl() + '/ssc/auth/1.0/logout')
      .share();

    request.subscribe(data => {
      this.store.dispatch({type: "@@ngrx/INIT"});
      this.store.dispatch({type: "CLOSE_MENU"});
      this.store.dispatch({type: LOGOUT});
    });
    return request;
  }

  keepAlive() {
    //   console.log('keep');
    //   setInterval(this.validate,1000 )
  }

  timeout() {
    return true;
  }
}
