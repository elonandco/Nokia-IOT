import {Injectable} from '@angular/core'
import {Observable} from 'rxjs/rx'
import {Http} from '@angular/http'
import 'rxjs/add/operator/map'
import {Store} from '@ngrx/store'

@Injectable()
export class FirmwareService {

    constructor(private _http:Http,private _store:Store<any>) {
    	this._store = _store;
    }

    public status:string = "";
    public message:string = "";
    public resultStatus:string = "";
    public resultMessage:string = "";
    public resultCode:string = "";

	public listStatus:string = "";
	public listMessage:string = "";
    public listResultStatus:string = "";
    public listResultMessage:string = "";
    public listResultCode:string = "";
    
    getfirmware() {
       	let firmwares = this._store.value.WorkflowContextReducer.globalContext["firmwareJSON"];
        this.status = this._store.value.WorkflowContextReducer.globalContext["firmwareStatus"];
    	this.message = this._store.value.WorkflowContextReducer.globalContext["firmwareMessage"];
        this.resultStatus = this._store.value.WorkflowContextReducer.globalContext["firmwareResultStatus"];
        this.resultMessage = this._store.value.WorkflowContextReducer.globalContext["firmwareResultMessage"];
        this.resultCode = this._store.value.WorkflowContextReducer.globalContext["firmwareResultCode"];
    	return firmwares;
    }

    getfirmwareList() {
       	let firmwares = this._store.value.WorkflowContextReducer.globalContext["firmwareListJSON"];
        this.listStatus = this._store.value.WorkflowContextReducer.globalContext["firmwareListStatus"];
    	this.listMessage = this._store.value.WorkflowContextReducer.globalContext["firmwareListMessage"];
        this.listResultStatus = this._store.value.WorkflowContextReducer.globalContext["firmwareListResultStatus"];
        this.listResultMessage = this._store.value.WorkflowContextReducer.globalContext["firmwareListResultMessage"];
        this.listResultCode = this._store.value.WorkflowContextReducer.globalContext["firmwareListResultCode"];
    	return firmwares;
    }
}
