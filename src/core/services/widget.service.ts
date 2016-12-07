import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Rx';
import {AbstractService} from './abstract-service';
import {AppConfigurationService} from './app-configuration.service';
import {BrowserStoreService} from './browser-store.service';
import {UPDATE_WIDGETS,WIDGET_REORDER} from '../reducers/user-preferences.reducer';

import * as _ from 'lodash';

@Injectable()
export class WidgetService implements AbstractService {

  initWorkflow: Observable<any>;
  widgets:Array<any>;

  constructor(
    private _store:Store<any>,
    private _appConfigService:AppConfigurationService,
    private _browserStoreService:BrowserStoreService
  )
  {
    this._store = _store;
    this.initWorkflow = this._store.select('InitWorkflowReducer');
    this.initWorkflow.subscribe(data => this.onInitCompleted(data));
  }

  onInitCompleted(data){
    if(data && data.hasOwnProperty('status') && data.status === 'completed'){
      let serviceWidgets:Array<any> = _.find(this._store.value.DSOModelReducer.domains.domain,{'id':'Widgets'}).services.service;
      let configWidgets:Array<any> = [];
       _.each(this._appConfigService.getWidgetsData(),function(widget){
         let widgetParse = widget.component.match(/^(.*)Widget.*/);
         if(widgetParse.length>1){
           widget.parseName = widgetParse[1];
           configWidgets.push(widget)
         }
      });

      this.widgets = _.intersectionWith(serviceWidgets,configWidgets,function(serviceWidget,configWidget){
        if(serviceWidget.name === configWidget.parseName){
          serviceWidget.path = configWidget.path;
          serviceWidget.component = configWidget.component;
          serviceWidget.settings = configWidget.defaultSettings;
          serviceWidget.metadata = configWidget.metadata;
          return true
        }
        return false

      });
      let useSettings = this._browserStoreService.getLocalStorage('userSettings');
      var localWidgets = this.widgets;
      if(useSettings){
        if(useSettings.widgetOrder){
          this._store.dispatch({type: WIDGET_REORDER, payload: useSettings.widgetOrder});
        }

        if(useSettings.widgets){
          let storeWidgets = useSettings.widgets;
          _.each(storeWidgets,function(sw){
            let widget = _.find(localWidgets,function(w) {
              return sw.name === w.name
            });

            if(widget){
                widget.isHidden = sw.isHidden;
              _.forIn(widget.settings,function(value,key){
                if(sw.settings && sw.settings.hasOwnProperty(key)){
                  widget.settings[key] = sw.settings[key];
                }
              })
            }
          });
        }
      }

      this.widgets = localWidgets;
      _.each(this.widgets,function(w){
        if(!w.hasOwnProperty('isHidden')){
          w.previousHidden = false;
          w.isHidden = false;
        }
      });

      this._store.dispatch({type: UPDATE_WIDGETS, payload: {widgets:this.widgets}});

    }
  }

  onLogOut(){}

}
