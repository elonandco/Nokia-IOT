import {Component, Input, Output, EventEmitter, OnChanges, SimpleChange} from '@angular/core';
import {WidgetSettingsComponent} from '../../../../core/components/dashboard/widgets/widget-settings.component';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {UPDATE_SETTINGS} from '../../../../core/reducers/user-preferences.reducer';
import {SETTINGS_SAVED} from '../../../reducers/widget-settings.reducer';
import {NgForm} from '@angular/common';
import {ToggleButtonComponent} from '../../../../core/components/toggleButton/toggle-button.componet';

@Component({
  selector: "widget-settings",
  templateUrl: "/src/custom/components/dashboard/campaigns/campaign-widget-settings.component.html",
  directives: [ToggleButtonComponent]
})

export class CampaignsWidgetSettingsComponent extends WidgetSettingsComponent {

  private widget:any;
  private showCount:boolean;
  private backupShowCount:boolean;
  private displayType:string;
  private backupDisplayType:string;
  private dosObs:Observable<any>;

  constructor(private store:Store<any>) {
    super();
    this.dosObs = this.store.select('UserPreferencesReducer');
    this.dosObs.subscribe(data => {
      this.widget = _.find(data.widgets, function (widget:any) {
        return widget.id === "Campaigns"
      });
    });

      if (this.widget) {
        if (this.widget.settings && this.widget.settings.hasOwnProperty('displayType')) {
          this.displayType = this.widget.settings.displayType;
          this.backupDisplayType = this.displayType;
        }

        if (this.widget.settings && this.widget.settings.hasOwnProperty('showCount')) {
          this.showCount = this.widget.settings.showCount;
          this.backupShowCount = this.showCount;
        }
      }
  }

  cancel(){
    this.displayType = this.backupDisplayType;
    this.showCount = this.backupShowCount;
  }

  save(){
    this.backupDisplayType = this.displayType;
    this.backupShowCount = this.showCount;
    this.widget.settings.displayType = this.displayType;
    this.widget.settings.showCount = this.showCount;
    
    //update settings
    this.store.dispatch({
      type: UPDATE_SETTINGS,
      payload: {'widget': this.widget, 'settings': {'showCount': this.showCount, 'displayType': this.displayType}}
    });
    //confirm that settings have been saved
    this.store.dispatch({
      type: SETTINGS_SAVED,
      payload: {'widget': this.widget, 'status': "saved"}
    });
  }

  onDisplayChange(e) {
    //change in display type
    if(e.currentTarget){
      this.displayType = e.currentTarget.value;
    }else{
      this.showCount = e;
    }
  }

}
