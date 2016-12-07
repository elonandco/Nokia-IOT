import {Injectable} from '@angular/core'
import {Observable} from 'rxjs/rx'
import {Http} from '@angular/http'
import 'rxjs/add/operator/map'
import {Store} from '@ngrx/store'

@Injectable()
export class CampaignService {

    constructor(private _http:Http,private _store:Store<any>) {
    	this._store = _store;
    }

    public status:string = "";
    public message:string = "";
    public resultStatus:string = "";
    public resultCode:string = "";
    public resultMessage:string = "";

	public listStatus:string = "";
	public listMessage:string = "";
    public listResultStatus:string = "";
    public listResultCode:string = "";
    public listResultMessage:string = "";
    

    getCampaign() {
       	let campaigns = this._store.value.WorkflowContextReducer.globalContext["campaignJSON"];
        this.status = this._store.value.WorkflowContextReducer.globalContext["campaignStatus"];
    	this.message = this._store.value.WorkflowContextReducer.globalContext["campaignMessage"];
        this.resultStatus = this._store.value.WorkflowContextReducer.globalContext["campaignResultStatus"];
        this.resultMessage = this._store.value.WorkflowContextReducer.globalContext["campaignResultMessage"];
        this.resultCode = this._store.value.WorkflowContextReducer.globalContext["campaignResultCode"];
    	return campaigns;
    }

    getCampaignList() {
       	let campaigns = this._store.value.WorkflowContextReducer.globalContext["campaignListJSON"];
        this.listStatus = this._store.value.WorkflowContextReducer.globalContext["campaignListStatus"];
    	this.listMessage = this._store.value.WorkflowContextReducer.globalContext["campaignListMessage"];
        this.listResultStatus = this._store.value.WorkflowContextReducer.globalContext["campaignListResultStatus"];
        this.listResultMessage = this._store.value.WorkflowContextReducer.globalContext["campaignListResultMessage"];
        this.listResultCode = this._store.value.WorkflowContextReducer.globalContext["campaignListResultCode"];
    	return campaigns;
    }
}
