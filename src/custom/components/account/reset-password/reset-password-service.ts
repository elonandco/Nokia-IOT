import {Injectable} from '@angular/core'
import {Observable} from 'rxjs/rx'
import {Http} from '@angular/http'
import 'rxjs/add/operator/map'
import {Store} from '@ngrx/store'

@Injectable()
export class ResetPasswordService {

    constructor(private _http:Http,private _store:Store<any>) {
    	this._store = _store;
    }

    public status:string = "";
    public message:string = "";
    public action_required:string = "";
    public password_status:string = "";

    getResetPassword() {
       	let reset_pass = this._store.value.WorkflowContextReducer.globalContext["resetPasswordJSON"];
        this.status = this._store.value.WorkflowContextReducer.globalContext["resetPasswordJSON"];
    	this.message = this._store.value.WorkflowContextReducer.globalContext["resetPasswordJSON"];
        this.action_required = this._store.value.WorkflowContextReducer.globalContext["initActionRequired"];
        this.password_status = this._store.value.WorkflowContextReducer.globalContext["resetPasswordStatus"];
    	return reset_pass;
    }

}
