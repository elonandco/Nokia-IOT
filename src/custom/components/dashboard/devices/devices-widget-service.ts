import {Injectable} from '@angular/core'
import {Observable} from 'rxjs/rx'
import 'rxjs/add/operator/map'
import {Store} from '@ngrx/store'

@Injectable()
export class DevicesService {

    public status:string = "";
    public message:string = "";

	public listStatus:string = "";
	public listMessage:string = "";

    constructor(private _store:Store<any>) {
       
    }

    getDevices() {
    	let devices = this._store.value.WorkflowContextReducer.globalContext["manufacturerCountJSON"];
    	this.status = this._store.value.WorkflowContextReducer.globalContext["manufacturerStatus"];
    	this.message = this._store.value.WorkflowContextReducer.globalContext["manufacturerMessage"];
    	return devices;
    }
    
    getDevicesList() {
    	let devices = this._store.value.WorkflowContextReducer.globalContext["deviceListJSON"];
    	this.listStatus = this._store.value.WorkflowContextReducer.globalContext["deviceListStatus"];
    	this.listMessage = this._store.value.WorkflowContextReducer.globalContext["deviceListMessage"];
    	return devices;
    }
    

}
