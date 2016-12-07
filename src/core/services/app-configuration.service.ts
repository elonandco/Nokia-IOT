import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AppConfigurationService {
  private _configData:any;

  constructor(private _http:Http) {
  }

  loadConfiguration() {
    let request:Observable<any> = this._http.get('src/custom/config.json')
      .map(res => res.json()).share();

    request.subscribe(
        res => {
          this._configData = res;
        },  // onNext
        err => console.error(err),			// onError
        () => console.log('AppConfiguration service is completed.')  // onCompleted
      );

    return request;
  }

  getConfigurationData() {
    return this._configData;
  }

  getWidgetsData() {
    return this._configData.widgets;
  }

  getWidgetData(name:string) {

    for(var i = 0;i<this._configData.widgets.length;i++){
      if(this._configData.widgets[i].component === name){
        return this._configData.widgets[i];
      }
    }

    return this._configData.widgets;
  }

  getLinkData() {
    return this._configData.links;
  }

  getWorkflowConfiguration():any {
    return this._configData.workflow;
  }

  getInitWorkflow():string {
    return this._configData.workflow.initWorkflowName;
  }

  getServerUrl():string {
    return this._configData.server.url;
  }

  getPollingInterval() {
    return this._configData.server.pollingInteval || 5000;
  }

  getBreadcrumbIgnoredNodes(){
    return this._configData.workflow.breadcrumbIgnoredNodes;
  }
}
