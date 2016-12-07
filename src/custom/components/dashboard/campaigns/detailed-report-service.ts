import {Injectable} from '@angular/core'
import {Observable} from 'rxjs/rx'
import {Http} from '@angular/http'
import 'rxjs/add/operator/map'
import {Store} from '@ngrx/store'

@Injectable()
export class ReportService {

    constructor(private _http:Http,private _store:Store<any>) {
        this._store = _store;
    }

    public listStatus:string = "";
    public listMessage:string = "";
    public listResultStatus:string = "";
    public listResultMessage:string = "";
    public listResultCode:string = "";

    getReportList() {
        let reports = this._store.value.WorkflowContextReducer.globalContext["reportListJSON"];
        this.listStatus = this._store.value.WorkflowContextReducer.globalContext["reportListStatus"];
        this.listMessage = this._store.value.WorkflowContextReducer.globalContext["reportListMessage"];
        this.listResultStatus = this._store.value.WorkflowContextReducer.globalContext["reportListResultStatus"];
        this.listResultMessage = this._store.value.WorkflowContextReducer.globalContext["reportListResultMessage"];
        this.listResultCode = this._store.value.WorkflowContextReducer.globalContext["reportListResultCode"];
        this.campaignReportJSON = this._store.value.WorkflowContextReducer.globalContext["campaignReportJSON"];
        return reports;
    }
}
