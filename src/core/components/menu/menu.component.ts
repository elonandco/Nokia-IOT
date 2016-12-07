import {Component, Input} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {ServiceView} from './menu.model';
import {Store} from '@ngrx/store';
import {CLOSE_MENU} from "../../reducers/menu.reducer";
import {DynamicRouteConfiguratorService} from "../../../core/services/dynamic-route-configurator.service";

@Component({
  selector: 'menu',
  templateUrl: '/src/core/components/menu/menu.component.html',
  styles: [`
    .tree-menu a::after{
      content:"";
    }
    .ko-Test_Flows::before,
    .ko-MY_WF::before {
      content:"\\e99b";
    }
  `]
})
export class MenuComponent {
  @Input() services:Array<ServiceView>;

  menu:Object = {};

  constructor(private _router:Router, private _store:Store,private _drc:DynamicRouteConfiguratorService) {

  }

  /**
   * Either route directly to service or toggle the operation menu if there is any. It also emits an event hide the menu component.
   * @param serviceView
   * @param routeName
   * @returns void
   */
  navigateToService(serviceView:ServiceView, routeName:string):void {
    if (serviceView.operations.length === 0) {
      this._store.dispatch({type:CLOSE_MENU});
      this._router.navigate([routeName]);
    }
  }

  /**
   * Route to destination page. It also emits an event hide the menu component.
   * @param routeName
   * @returns void
   */
  navigateToOperation(routeName:string):void {
    this._store.dispatch({type:CLOSE_MENU});
    this._router.navigate([routeName]);
  }

}
