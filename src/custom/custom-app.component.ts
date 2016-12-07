import {Component} from '@angular/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {HeaderComponent} from '../core/components/header/header.component';
import {DynamicRouteConfiguratorService} from '../core/services/dynamic-route-configurator.service';
import {AppConfigurationService} from '../core/services/app-configuration.service';
import {AuthenticationService} from '../core/services/authentication.service';
import {WidgetService} from '../core/services/widget.service';
import {QuickLinkService} from '../core/services/quick-link.service';
import {DeviceComponent} from './components/dashboard/quick-links/device.component';
import {App} from '../core/app';
import {MenuComponent} from '../core/components/menu/menu.component';
import {DomainView, ServiceView, OperationView} from '../core/components/menu/menu.model';
import {SSCWorkflowExecutionService} from '../core/services/ssc-workflow-execution.service';
import {BrowserStoreService} from '../core/services/browser-store.service';
import {Observable} from 'rxjs/Rx';
import {Store} from '@ngrx/store';
import {DASHBOARD_CREATE} from "../core/reducers/dashboard.reducer";

@Component({
  selector: 'my-app',
  templateUrl: 'src/custom/custom-app.component.html',
  directives: [
    ROUTER_DIRECTIVES,
    HeaderComponent,
    MenuComponent
  ],
  providers: [DynamicRouteConfiguratorService,
    AppConfigurationService,
    BrowserStoreService,
    AuthenticationService,
    QuickLinkService,
    WidgetService,
    SSCWorkflowExecutionService]
})

@RouteConfig([
  {
    path: '/device',
    name: 'Device',
    component: DeviceComponent
  }
])

export class CustomAppComponent extends App {
  isMenuActive:boolean = false;
  domainView:DomainView = new DomainView();
  menu$:Observable<any>;
  dsoModel$:Observable<any>;

  constructor(private _router:Router,
              private _widgetService:WidgetService,
              private _quickLinkService:QuickLinkService,
              private _authenticationService:AuthenticationService,
              private _acs:AppConfigurationService,
              private _store:Store<any>) {
    super();
    this._router.config(this._getDefaultRouterConfig());
    this._store = _store;
    this.menu$ = this._store.select('MenuReducer');
    this.menu$.subscribe(
      data => {
        this.isMenuActive = data;
      },
      (error) => {
        console.log('Error:', +error);
      }
    );

    this.dsoModel$ = this._store.select('DSOModelReducer');
    this.dsoModel$.subscribe(
      data => {
        this.domainView = this.jsonToMenuModel(data);
      },
      (error) => {
        console.log('Error: ', error);
      }
    );
  }

  ngOnInit() {
    this._acs.loadConfiguration().subscribe(
      res => {
        this.validate();
      }
    );
  }

  jsonToMenuModel(json) {
    let menuDomain = new DomainView();
    if (json && json.domains) {
      json.domains.domain.forEach((domain:any) => {
        if (domain.id === 'Menu'){
          menuDomain.id = domain.id;
          if (domain.services) {
            domain.services.service.forEach((service:any)=> {
              let menuService = new ServiceView();
              menuService.id = service.id;
              menuService.name = service.name;
              if (service.operations) {
                service.operations.operation.forEach((op:any)=> {
                  let menuOperation = new OperationView();
                  menuOperation.id = op.id;
                  menuOperation.name = op.name;
                  menuService.operations.push(menuOperation);
                });
              }
              menuDomain.services.push(menuService);
            });
          }
        }
      });
    }

    return menuDomain;
  }

  validate() {
    this._authenticationService.validate().subscribe(
      data => {
        this._store.dispatch({type:DASHBOARD_CREATE});
        let link = ['Dashboard'];
        this._router.navigate(link);
      },
      err => {
        let link = ['Login'];
        this._router.navigate(link);
      }
    );
  }

}
