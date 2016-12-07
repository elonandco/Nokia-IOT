import {Component, Input, Output, EventEmitter, OnChanges, SimpleChange} from '@angular/core';
import {WidgetSettingsComponent} from '../../../../core/components/dashboard/widgets/widget-settings.component';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {UPDATE_SETTINGS} from '../../../../core/reducers/user-preferences.reducer';
import {NgForm} from '@angular/common';
import {SETTINGS_SAVED} from '../../../reducers/widget-settings.reducer';
import {ToggleButtonComponent} from '../../../../core/components/toggleButton/toggle-button.componet';

@Component({
  selector: "widget-settings",
  templateUrl: "/src/custom/components/dashboard/users/users-widget-settings.component.html",
  directives: [ToggleButtonComponent]
})

export class UsersWidgetSettingsComponent extends WidgetSettingsComponent {

  private displayCount:boolean = true;
  private displayCountOld:boolean = true;
  private widget:any;
  private dosObs:Observable<any>;

  constructor(private store:Store<any>) {
    super();
    this.dosObs = this.store.select('UserPreferencesReducer');
    this.dosObs.subscribe(data => {

      this.widget = _.find(data.widgets, function (widget) {
        return widget.id === "Users";
      });

      if (this.widget) {
        if (this.widget.settings && this.widget.settings.hasOwnProperty('displayCount')) {
          this.displayCount = this.widget.settings.displayCount;
          this.displayCountOld = this.widget.settings.displayCount;
        }

      }
    });
  }

  displayCountToggle() {
    this.displayCount = !this.displayCount;
    //this.store.dispatch({
    //  type: UPDATE_SETTINGS,
    //  payload: {'widget': this.widget, 'settings': {'displayCount': this.displayCount}}
    //})
  }

  cancel(){
    this.displayCount = this.displayCountOld;
  }

  save(){
    this.displayCountOld = this.displayCount;

    this.store.dispatch({
      type: UPDATE_SETTINGS,
      payload: {'widget': this.widget, 'settings': {'displayCount' : this.displayCount}}
    });

    this.store.dispatch({
      type: SETTINGS_SAVED,
      payload: {'widget': this.widget, 'status': "saved"}
    });

  }

}
