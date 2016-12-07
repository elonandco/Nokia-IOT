
import {Injectable, Component, Input, Output} from "@angular/core";
import {Location} from '@angular/common';
import {WidgetContentComponent} from "../../../../core/components/dashboard/widgets/widget-content.component";
import {GroupsService} from '../../../../custom/components/dashboard/groups/groups-widget-service'
import { NgFor } from '@angular/common';
import {Observable} from 'rxjs/rx'
import {Store} from '@ngrx/store'

@Injectable()
@Component({
    selector: "widget-content",
    templateUrl: "/src/custom/components/dashboard/groups/groups-widget-content.component.html",
    styleUrls: ['/src/custom/components/dashboard/groups/groups-widget.css'],
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
     
     .widget-scan .scan-stats li {
        list-style: none;
        border-top: solid 1px #ccc;
        padding: 12px 0 3px 0;
        overflow: hidden;
      }
      
      .widget-scan .scan-stats span {
        font-size: 15px;
        line-height: 15px;
        display: block;
        margin: 0;
      }
      
      .widget-scan .scan-stats .progress {
        float: left;
        width: 100%;
        background: none;
        height: auto;
        margin: 0;
        box-shadow: none;
      }
      
      .widget-scan .percent-bar {
           max-width: 182px;
           background: #0c69c4;
           height: 10px;
           float: left;
           margin: 6px 0 0 0;
           -webkit-animation: progress-bar 2s;
           -moz-animation: progress-bar 2s;
           animation: progress-bar 2s;
      }
      
      @-webkit-keyframes progress-bar {
          0% { width: 0; }
        }
      @-moz-keyframes progress-bar {
          0% { width: 0; }
        }
      keyframes progress-bar {
          0% { width: 0; }
        }
      
      .widget-scan .scan-stats .scan-percentage {
           float: right;
           font-size: 20px;
           line-height: 18px;
       }
 `],
    providers: [GroupsService],
    directives: [NgFor]
})

export class GroupsWidgetContentComponent extends WidgetContentComponent {
    private _groups: Object[] = [];
	private status:string = "";
	private message:string = "";
	private code:string = "";
	public sortInfo:any = {'field':'','order':''};
	private widget:any;
	
    constructor(private store:Store<any>, public _groupsService: GroupsService) {
        super();

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
    	let _tempGroups = this._groupsService.getGroups();
    	this._groups = _.orderBy(_tempGroups, [this.sortInfo.field], [this.sortInfo.order]);
    	
        this.status = this._groupsService.status;
        this.message = this._groupsService.message;
        this.code = this._groupsService.code;
       
        this._calculateWidths(this._groups);
    }
    
    updatePreferences(widgets:any){
		this.widget = _.find(widgets, function (widget:any) {
	      return widget.id === "Groups"
	    });
	    if (this.widget && this.widget.settings 
	    		&& this.widget.settings.hasOwnProperty('sortInfo')) {
	        this.sortInfo = this.widget.settings.sortInfo;
	    }
	  }

    private _calculateWidths(precleanedgroups) {

    	let tempGroups = _.sortBy(precleanedgroups, 'Count').reverse();
    	
        let highestval: number = 0;

        if (tempGroups.length > 0) {
            highestval = tempGroups[0]["Count"];
        }

        let localpercent: number = 0;
        let localprogresswidth: number = 0;
        _.each(precleanedgroups, function (item, index) {
            localpercent = 0, localprogresswidth = 0;
            localpercent = Math.floor((item["Count"] * 100) / highestval);
            localprogresswidth = Math.floor((localpercent * 182) / 100); // Here 182px is the 100% width of the progress bar
            _.extend(item, { width: localprogresswidth });

        });

        this._groups = precleanedgroups;
    }	
}

