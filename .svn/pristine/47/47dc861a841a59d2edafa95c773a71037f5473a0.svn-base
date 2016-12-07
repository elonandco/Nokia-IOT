import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {DevicesWidgetContentComponent} from './devices-widget-content.component';
import {DevicesWidgetSettingsComponent} from './devices-widget-settings.component';
import {WidgetComponent} from "../../../../core/components/dashboard/widgets/widget.component";
import {DynamicRouteConfiguratorService} from "../../../../core/services/dynamic-route-configurator.service";
import {Observable} from 'rxjs/Rx';
import {WorkflowComponent} from '../../../../core/components/workflow/workflow.component';
import {Store} from '@ngrx/store';

@Component({
  selector: 'widget',
  directives: [DevicesWidgetContentComponent, DevicesWidgetSettingsComponent, WorkflowComponent],
  templateUrl: '/src/core/components/dashboard/widgets/widget.component.html'
})

export class DevicesWidgetComponent extends WidgetComponent {

	/*important store the main key of the json to use on this widget
	 * it is used on the refresh stuff*/
  dataObjectName = 'manufacturerCountJSON';
  
  @ViewChild(DevicesWidgetSettingsComponent) settings:DevicesWidgetSettingsComponent;
  widgetSettingsObs:Observable<any>;
  
  constructor(private _router:Router,
              _store:Store<any>,
            private _drc:DynamicRouteConfiguratorService) {
    super(_store);
    this.widgetSettingsObs = _store.select('WidgetSettingsReducer');
    this.widgetSettingsObs.subscribe(data=>this.onRebuild(data));
    
  }

  showDetail():void {
    console.log('showDetail devices detail');
    this._router.navigate(['EAP_IOT_VIEW_DEVICES']);
  }
  
  saveSettings():void{
	  this.refreshing = true;
	  console.log("saving DEVICES settings");
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
	  console.log("rebuilding Devices");
	  this.refreshing = false;
	  this.fullRefresh = false;
  }

  ngOnDestroy(){
	  console.log("Widget device - unsubscribing:::" + this.type);
	  this.dsoObsubscription.unsubscribe();
	  this.userPrefObsubscription.unsubscribe();
	  this.widgetSettingsObs.unsubscribe();
  }
  
  title:string = "Devices";
}
