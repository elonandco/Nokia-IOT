import {Component, ViewChild} from "@angular/core";
import {Router} from "@angular/router-deprecated";
import {GroupsWidgetContentComponent} from "./groups-widget-content.component";
import {GroupsWidgetSettingsComponent} from './groups-widget-settings.component';
import {WidgetComponent} from "../../../../core/components/dashboard/widgets/widget.component";
import {DynamicRouteConfiguratorService} from "../../../../core/services/dynamic-route-configurator.service";
import {Observable} from 'rxjs/Rx';
import {WorkflowComponent} from '../../../../core/components/workflow/workflow.component';
import {Store} from '@ngrx/store';

@Component({
  selector: 'widget',
  directives: [GroupsWidgetContentComponent, GroupsWidgetSettingsComponent, WorkflowComponent],
  templateUrl: '/src/core/components/dashboard/widgets/widget.component.html'
})

export class GroupsWidgetComponent extends WidgetComponent {
	
  dataObjectName = 'groupCountJSON';
	
  @ViewChild(GroupsWidgetSettingsComponent) settings:GroupsWidgetSettingsComponent;
  widgetSettingsObs:Observable<any>;

  constructor(private _router:Router,
              _store:Store<any>,
              private _drc:DynamicRouteConfiguratorService) {
    super(_store);
    this.widgetSettingsObs = _store.select('WidgetSettingsReducer');
    this.widgetSettingsObs.subscribe(data=>this.onRebuild(data));
  }

  showDetail():void {
    console.log('showDetail groups detail');
    this._router.navigate(['EAP_IOT_VIEW_GROUPS_TREE_MENU']);
  }

  saveSettings():void{
	  this.refreshing = true;
	  console.log("saving Groups settings");
	  this.settings.save();
	  this.displaySettings = false;
	  this.fullRefresh = true;
  }
  
  cancelSettings():void{
	  super.cancelSettings();
	  this.settings.cancel();
  }
  
  hideSettings():void {
	  super.hideSettings();
	  this.settings.cancel();
  }  

  onRebuild():void{
	  console.log("rebuilding Groups");
	  this.refreshing = false;
	  this.fullRefresh = false;
  }

  ngOnDestroy(){
	  console.log("Widget device - unsubscribing:::" + this.type);
	  this.dsoObsubscription.unsubscribe();
	  this.userPrefObsubscription.unsubscribe();
	  this.widgetSettingsObs.unsubscribe();
  }
  
  title:string = "Groups";
}
