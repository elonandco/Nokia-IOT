import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {HTTP_PROVIDERS, BrowserXhr} from '@angular/http';
import {provide} from '@angular/core';
import {CustomBrowserXhr} from '../src/core/services/custom-browser-xhr.service';
import {CustomAppComponent} from '../src/custom/custom-app.component';
import {provideStore, usePreMiddleware, usePostMiddleware, Middleware} from '@ngrx/store';
import {AuthenticationReducer} from '../src/core/reducers/authentication.reducer';
import 'rxjs/Rx';
import {InitWorkflowReducer} from './core/reducers/init-workflow.reducer';
import {WorkflowExecutionReducer} from './core/reducers/workflow-execution.reducer';
import {DSOModelReducer} from './core/reducers/dso-model.reducer';
import {WorkflowContextReducer} from './core/reducers/workflow-context.reducer';
import {SidebarUiContainerReducer, GroupContextReducer} from './core/reducers/sidebar-groups.reducer';
import {DragulaService} from 'ng2-dragula/ng2-dragula';
import {MenuReducer} from './core/reducers/menu.reducer';
import {UserPreferencesReducer} from './core/reducers/user-preferences.reducer';
import {WidgetSettingsReducer} from './custom/reducers/widget-settings.reducer';
import {DashboardReducer} from './core/reducers/dashboard.reducer';

const actionLog:Middleware = action => {
  return action.do(val => {
    console.info('DISPATCHED ACTION: ', val)
  });
};

const stateLog:Middleware = state => {
  return state.do(val => {
    console.info('NEW STATE: ', val)
  });
};

/**
 * Reducer Objects provided by the Core Framework
 * @type {{AuthenticationReducer: Reducer<AuthenticationModel>, InitWorkflowReducer: Reducer<any>, WorkflowExecutionReducer: Reducer<Array<WorkflowExecution>>, WorkflowContextReducer: Reducer<Array<WorkflowContext>>, DSOModelReducer: Reducer<DSOModel>}}
 */
const CoreReducers = {
  AuthenticationReducer,
  InitWorkflowReducer,
  WorkflowExecutionReducer,
  WorkflowContextReducer,
  DSOModelReducer,
  MenuReducer,
  SidebarUiContainerReducer,
  GroupContextReducer,
  UserPreferencesReducer,
  WidgetSettingsReducer,
  DashboardReducer
};

/**
 * Reducer Objects provided by the custom implementation
 * @type {{}}
 */
const CustomReducers = {};

bootstrap(CustomAppComponent, [
  HTTP_PROVIDERS,
  provide(BrowserXhr, {useClass: CustomBrowserXhr}),
  ROUTER_PROVIDERS,
  //provide(LocationStrategy, {useClass: PathLocationStrategy}),
  //provide(APP_BASE_HREF, {useValue: '/'}),
  provideStore(Object.assign({}, CoreReducers, CustomReducers)),
  provide(DragulaService, {useClass: DragulaService}),
  usePreMiddleware(actionLog),
  usePostMiddleware(stateLog)
]);
