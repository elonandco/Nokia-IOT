
import {Injectable, Component, Input, Output} from "@angular/core";
import {Location} from '@angular/common';
import {WidgetContentComponent} from "../../../../core/components/dashboard/widgets/widget-content.component";
import {DevicesService} from '../../../../custom/components/dashboard/devices/devices-widget-service'
import { NgFor } from '@angular/common';
import {Observable} from 'rxjs/rx'
import {Store} from '@ngrx/store'

@Injectable()
@Component({
    selector: "widget-content",
    templateUrl: "/src/custom/components/dashboard/devices/devices-widget-content.component.html",
    styleUrls: ['/src/custom/components/dashboard/devices/devices-widget.css'],
    styles: [`
    :host {
        padding:0px;
        width: 300px;
        height:300px;
        display: block;
        clear:both;
        margin:5px;
    }
    
    .widget-scan {
       margin: 10px 0 0 0;
       font-family: 'robotolight';
     }
    
    .widget-scan .columns {
        font-size: 14px;
        color: #333;
        font-weight: 700;
     }
     
     .widget-scan .subgroups-name {
        float: right;
     }
     
     .widget-scan .scan-stats {
        margin: 0;
        padding: 0;
     }
     
     .groupitems {
         width: 100%;
         padding: 10px 0;         
     }
     
     .groupitems .groupitem{
         width: 100%;
         clear: both;
         border-top: #e0e0e0 1px solid;;
     }
     
     .groupitems .groupitem .groupname {
        display: inline-block;
        float: left;
        margin: 13px 0 13px 0px;
        color: #000;
        font-size: 15px;
        line-height: 9px;
     }
     
     .groupitems .groupitem .groupicon {
         float : left;
     }
     
     .groupitems .groupitem .grouptext {
            margin-left: 20px;
            line-height: 34px;
     }
     
     .groupitems .groupitem .groupvalue {
          display: inline-block;
          float: right;
          font-size: 20px;
          font-family: 'robotolight';
          padding: 15px 0px;
     }
       
 `],
    providers: [DevicesService],
    directives: [NgFor]
})

export class DevicesWidgetContentComponent extends WidgetContentComponent {
    private _devices: Object[] = [];
	private widget:any;
    public sortInfo:any = {'field':'Manufacturer','order':'asc'};
	private _devicesService: DevicesService
	private status:string = "";
	private message:string = "";

    constructor(private store:Store<any>,_devicesService: DevicesService) {
        super();
        
        this._devicesService = _devicesService;
        
        let userPreferences = this.store.value.UserPreferencesReducer;
        
        if (userPreferences != undefined && userPreferences.widgets != undefined){
        	this.updatePreferences(userPreferences.widgets);
        }
        
        this.getDataBaseOnPreferences();
        
        this.userPrefObs = this.store.select('UserPreferencesReducer');
        this.userPrefObs.subscribe(data =>{ 
        	this.updatePreferences(data.widgets)
        	this.getDataBaseOnPreferences();
        });
     }
        
    getDataBaseOnPreferences(){
		let _tempDevices = this._devicesService.getDevices();
		this._devices = _.orderBy(_tempDevices, [this.sortInfo.field], [this.sortInfo.order]);
		
		 this.status = this._devicesService.status;
	     this.message = this._devicesService.message;
	}
    	
	updatePreferences(widgets:any){
		this.widget = _.find(widgets, function (widget:any) {
          return widget.id === "Devices"
        });
        if (this.widget && this.widget.settings 
        		&& this.widget.settings.hasOwnProperty('sortInfo')) {
            this.sortInfo = this.widget.settings.sortInfo;
        }
      }
}
