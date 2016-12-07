import {Injectable} from '@angular/core'
import {Observable} from 'rxjs/rx'
import {Http} from '@angular/http'
import 'rxjs/add/operator/map'
import {Store} from '@ngrx/store'

@Injectable()
export class GroupsService {

	
    constructor(private _http:Http,private _store:Store<any>) {
    	this._store = _store;
    }

    public status:string = "";
    public message:string = "";
    public code:string = "";
    
    getGroups(data) {
    	let groups = this._store.value.WorkflowContextReducer.globalContext["groupCountJSON"];
    	this.status = this._store.value.WorkflowContextReducer.globalContext["groupResultStatus"];
    	this.message = this._store.value.WorkflowContextReducer.globalContext["groupResultMessage"];
    	this.code = this._store.value.WorkflowContextReducer.globalContext["groupResultCode"];
    	return groups;
    }
}
