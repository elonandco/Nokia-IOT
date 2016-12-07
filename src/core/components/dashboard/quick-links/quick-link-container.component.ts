import {Component, ViewContainerRef,ViewChild, DynamicComponentLoader, ComponentRef} from "@angular/core";
import {AppConfigurationService} from "../../../services/app-configuration.service";
import {Store} from '@ngrx/store';
import {TOGGLE_SIDEBAR_WIDGET, TOGGLE_SIDEBAR_GROUP} from "../../../reducers/sidebar-groups.reducer";
import {Observable} from 'rxjs/Rx';
import {Router} from "@angular/router-deprecated";
import {DynamicRouteConfiguratorService} from "../../../../core/services/dynamic-route-configurator.service";

declare var System;

@Component({
  selector: 'quick-link-container',
  templateUrl: '/src/core/components/dashboard/quick-links/quick-link-container.component.html',
})

export class QuickLinkContainerComponent {

  @ViewChild('link', {read: ViewContainerRef}) childContentPlace: ViewContainerRef;

  userPrefObs:Observable<any>;
  private loaded:boolean = false;
  private compRefs:Array<any> = []

  constructor(private _dcl:DynamicComponentLoader,
              private _router:Router,
              private _appConfigService:AppConfigurationService,
              private _store:Store<any>,
              private _drc:DynamicRouteConfiguratorService) {
    this._store = _store;
    this.userPrefObs = this._store.select('UserPreferencesReducer');
    this.userPrefObs.subscribe(
        data=>{
          if(this.loaded){
            for(var i = 0;i<this.compRefs.length;i++){
              var refs = this.compRefs;
              let link = _.find(this._store.value.UserPreferencesReducer.quickLinks, function(ql:any){
                return ql.name === refs[i].instance.type
              });
              if(link){
                refs[i].instance['isHidden'] = link.isHidden;
              }
            }
            return
          }
        if(data.quickLinks){
          this.loaded = true;
          this.loadWQuickLinks(data.quickLinks);
        }
      },
        error=>{

      }

    );
  }

  private loadWQuickLinks(quickLinks):any {
    for(var i = 0;i<quickLinks.length;i++) {
      this.loadQuickLink(quickLinks[i])
    }
  }
  private loadQuickLink(quickLink):any {
    // load quick link components
    System.import(quickLink.path).then(componentModule => componentModule[quickLink.component]).then(component=> {
      this._dcl.loadNextToLocation(component, this.childContentPlace).then((compRef:ComponentRef<any>) => {
        compRef.instance['isHidden'] = quickLink.isHidden;
        this.compRefs.push(compRef);
      });
    });
  }
  toggleWidget() {
    this._store.dispatch({type:TOGGLE_SIDEBAR_WIDGET})
  }
  toggleGroup() {
    this._store.dispatch({type: TOGGLE_SIDEBAR_GROUP});
  }
  launchAddCampaign() {
    console.log('launching add campagin flow');
    this._router.navigate(['EAP_IOT_ADD_CAMPAIGN']);
  }
  launchAddFirmware() {
    console.log('launching add firmware flow');
    this._router.navigate(['EAP_IOT_ADD_FIRMWARE']);
  }
}
