import {Component, ViewChild} from "@angular/core";
import {Router} from "@angular/router-deprecated";
import {UsersWidgetContentComponent} from "./users-widget-content.component";
import {UsersWidgetSettingsComponent} from './users-widget-settings.component';
import {WidgetComponent} from "../../../../core/components/dashboard/widgets/widget.component";
import {DynamicRouteConfiguratorService} from "../../../../core/services/dynamic-route-configurator.service";
import {Observable} from 'rxjs/Rx';
import {Store} from '@ngrx/store';

@Component({
  selector: 'widget',
  directives: [UsersWidgetContentComponent, UsersWidgetSettingsComponent],
  templateUrl: '/src/core/components/dashboard/widgets/widget.component.html'
})

export class UsersWidgetComponent extends WidgetComponent {

  @ViewChild(UsersWidgetSettingsComponent) settings:UsersWidgetSettingsComponent;
  widgetSettingsObs:Observable<any>;

  constructor(private _router:Router,
              _store:Store<any>,
              private _drc:DynamicRouteConfiguratorService) {
    super(_store);
    this.widgetSettingsObs = _store.select('WidgetSettingsReducer');
    this.widgetSettingsObs.subscribe(data=>this.onRebuild(data));
  }

  showDetail():void {
    console.log('showDetail users detail');
    this._router.navigate(['EAP_IOT_VIEW_USERS']);
  }

  saveSettings():void{
    this.refreshing = true;
    console.log("saving Users settings");
    this.settings.save();
    this.displaySettings = false;
    this.fullRefresh = true;
  }

  onRebuild():void{
    console.log("rebuilding users widget");
    this.refreshing = false;
    this.fullRefresh = false;
  }

  cancelSettings():void{
    super.cancelSettings();
    this.settings.cancel();
  }

  hideSettings():void {
    super.hideSettings();
    this.settings.cancel();
  }

  title:string = "Users";
}
