import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {CampaignsWidgetContentComponent} from './campaign-widget-content.component';
import {CampaignsWidgetSettingsComponent} from './campaign-widget-settings.component';
import {WidgetComponent} from '../../../../core/components/dashboard/widgets/widget.component';
import {DynamicRouteConfiguratorService} from '../../../../core/services/dynamic-route-configurator.service';
import {Store} from '@ngrx/store';
import {WorkflowComponent} from '../../../../core/components/workflow/workflow.component';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'widget',
  directives: [CampaignsWidgetContentComponent, CampaignsWidgetSettingsComponent, WorkflowComponent],
  templateUrl: '/src/core/components/dashboard/widgets/widget.component.html'
})

export class CampaignsWidgetComponent extends WidgetComponent {

  componentData:any;
  dataObjectName = 'campaign_widget_data';
  title:string = "Campaigns";
  data:any;
  drawn:boolean = false;

  set widget_data(data) {
    this.drawn = true;
    this.componentData = data;
  }

  @ViewChild(CampaignsWidgetSettingsComponent) settings:CampaignsWidgetSettingsComponent;
  dosObs:Observable<any>;

  constructor(private _router:Router,
              private store:Store<any>,
              private _drc:DynamicRouteConfiguratorService) {
    super(store);

    this.dosObs = this.store.select('DSOModelReducer');
    this.widgetSettingsObs = this.store.select('WidgetSettingsReducer');
    this.dosObs.subscribe((data:any) => {
      let widgetDomain = _.find(data.domains.domain, function (domain:any) {
        return domain.id === "Widgets";
      });
      if (widgetDomain) {
        let campaignService = _.find(widgetDomain.services.service, function (service:any) {
          return service.id === "Campaigns";
        });
        if (campaignService) {
          if (campaignService && typeof campaignService === 'string') {
            this.data = JSON.parse(campaignService.attributes.data);
          } else {
            this.data = campaignService.attributes.data;
          }
          if (!campaignService.isHidden) {
            this.componentData = this.data;
          }
        }
      }

    }, error => {
    });
    this.widgetSettingsObs.subscribe(data=>this.onRebuild(data));
  }

  showDetail():void {
    console.log('showDetail campaigns detail');
    this._router.navigate(['EAP_IOT_VIEW_CAMPAIGNS']);
  }

  saveSettings() {
    this.refreshing = true;
    console.log("saving Campaign settings");
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
    console.log("rebuilding Campaigns");
    this.refreshing = false;
    this.fullRefresh = false;
  }

  ngOnDestroy(){
    console.log("Widget device - unsubscribing:::" + this.type);
    this.dosObs.unsubscribe();
  }

  onUnhide():void {
    /*
     Since the chart library determines the width of the chart when initialized, you have to first see if the wrapper has been drawn.
     If it has not been drawn yet, you have to wait for the widget to finish it's transform CSS, and thus gets to the right size, before drawing the chart
     */
    if (!this.drawn) {
      setInterval(() => {
        this.componentData = this.data
      }, 500)
    } else {
      this.componentData = this.data
    }
    this.drawn = true;
  }

}
