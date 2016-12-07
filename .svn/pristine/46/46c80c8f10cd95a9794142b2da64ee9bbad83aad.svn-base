import {Component, Input, Output, EventEmitter, OnChanges, SimpleChange} from '@angular/core';
import {WidgetSettingsComponent} from '../../../../core/components/dashboard/widgets/widget-settings.component';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {UPDATE_SETTINGS} from '../../../../core/reducers/user-preferences.reducer';
import {ToggleButtonComponent} from '../../../../core/components/toggleButton/toggle-button.componet';
import {NgForm} from '@angular/common';
import {SETTINGS_SAVED} from '../../../reducers/widget-settings.reducer';

@Component({
  selector: "widget-settings",
  templateUrl: "/src/custom/components/dashboard/devices/devices-widget-settings.component.html",
  directives: [ToggleButtonComponent]
})

export class DevicesWidgetSettingsComponent extends WidgetSettingsComponent {

  private widget:any;
  public sortInfo:any = {'field':'','order':''};
  private sortInfoBckp:any = {'field':'','order':''};
  private dosObs:Observable<any>;

  constructor(private store:Store<any>) {
    super();
    this.dosObs = this.store.select('UserPreferencesReducer');
    
    //TODO: in addition/instead of subcriber, read the value from the store and initialice them
    this.dosObs.subscribe(data => {
      this.widget = _.find(data.widgets, function (widget:any) {
        return widget.id === "Devices"
      });
      
      if (this.widget && this.widget.settings 
    		&& this.widget.settings.hasOwnProperty('sortInfo')) {
        this.sortInfo = this.widget.settings.sortInfo;
        this.sortInfoBckp = this.sortInfo;
      }
     });
  }
  
  cancel(){
	  this.sortInfo = this.sortInfoBckp;  
  }

  save(){

   if (typeof this.sortInfo === 'string'){
     this.sortInfo = JSON.parse(this.sortInfo);
   }
   
   this.sortInfoBckp = this.sortInfo;
	  
	this.store.dispatch({
	      type: UPDATE_SETTINGS,
	      payload: {'widget': this.widget, 'settings': {'sortInfo' : this.sortInfo}}
	});
	
	this.store.dispatch({
	      type: SETTINGS_SAVED,
	      payload: {'widget': this.widget, 'status': "saved"}
	});
	
  }
}


