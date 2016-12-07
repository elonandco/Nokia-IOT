import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AbstractService} from './abstract-service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class BrowserStoreService implements AbstractService {

  userPrefObs:Observable<any>;

  constructor(public store:Store<any>) {
    this.store = store;
    this.userPrefObs = this.store.select('UserPreferencesReducer');
    this.userPrefObs.subscribe(
      (data:any)=> {
        if (data && data.quickLinksloaded && data.widgetsLoaded) {
          this.save(data)
        }
      },
      error=> {

      }
    );

  }

  save(data:any) {

    var widgetArray:Array<any> = [],
      wObj:any;
    _.each(data.widgets, function (widget:any) {
      wObj = {};
      wObj.isHidden = widget.isHidden;
      wObj.settings = widget.settings;
      wObj.name = widget.name;
      widgetArray.push(wObj);
    });

    var quickLinkArray:Array<any> = [],
      qlObj:any;
    _.each(data.quickLinks, function (quickLink:any) {
      qlObj = {};
      qlObj.isHidden = quickLink.isHidden;
      qlObj.name = quickLink.name;
      quickLinkArray.push(qlObj);
    });

    var saveObj = {
      widgets: widgetArray,
      quickLinks: quickLinkArray,
      widgetOrder: data.widgetOrder
    };

    this.setLocalStorage('userSettings', saveObj);
    console.log('saving.... ' + saveObj);

  }

  setLocalStorage(name:string, data:any, stringify:boolean = true) {
    if (stringify) {
      data = JSON.stringify(data)
    }

    localStorage.setItem(name, data)
  }

  getLocalStorage(name:string, parseJSON:boolean = true) {
    if (parseJSON) {
      return JSON.parse(localStorage.getItem(name));
    }

    return localStorage.getItem(name);
  }

  onLogOut() {

  }

}
