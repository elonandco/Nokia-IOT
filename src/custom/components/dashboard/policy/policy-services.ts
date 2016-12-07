import {Injectable} from '@angular/core'
import {Observable} from 'rxjs/rx'
import {Http} from '@angular/http'
import 'rxjs/add/operator/map'
import {Store} from '@ngrx/store'

@Injectable()
export class PolicyServices {

    constructor(private _http:Http,private _store:Store<any>) {
    	this._store = _store;
    }

    public status:string = "";
    public message:string = "";

    getPolicy() {
        //this.status = this._store.value.WorkflowContextReducer.globalContext["resetPasswordJSON"];
    	//this.message = this._store.value.WorkflowContextReducer.globalContext["resetPasswordJSON"];
    }

}
