System.register(['@angular/platform-browser-dynamic', '@angular/router-deprecated', '@angular/http', '@angular/core', '../src/core/services/custom-browser-xhr.service', '../src/custom/custom-app.component', '@ngrx/store', '../src/core/reducers/authentication.reducer', 'rxjs/Rx', './core/reducers/init-workflow.reducer', './core/reducers/workflow-execution.reducer', './core/reducers/dso-model.reducer', './core/reducers/workflow-context.reducer', './core/reducers/sidebar-groups.reducer', 'ng2-dragula/ng2-dragula', './core/reducers/menu.reducer', './core/reducers/user-preferences.reducer', './custom/reducers/widget-settings.reducer', './core/reducers/dashboard.reducer'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var platform_browser_dynamic_1, router_deprecated_1, http_1, core_1, custom_browser_xhr_service_1, custom_app_component_1, store_1, authentication_reducer_1, init_workflow_reducer_1, workflow_execution_reducer_1, dso_model_reducer_1, workflow_context_reducer_1, sidebar_groups_reducer_1, ng2_dragula_1, menu_reducer_1, user_preferences_reducer_1, widget_settings_reducer_1, dashboard_reducer_1;
    var actionLog, stateLog, CoreReducers, CustomReducers;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (custom_browser_xhr_service_1_1) {
                custom_browser_xhr_service_1 = custom_browser_xhr_service_1_1;
            },
            function (custom_app_component_1_1) {
                custom_app_component_1 = custom_app_component_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (authentication_reducer_1_1) {
                authentication_reducer_1 = authentication_reducer_1_1;
            },
            function (_1) {},
            function (init_workflow_reducer_1_1) {
                init_workflow_reducer_1 = init_workflow_reducer_1_1;
            },
            function (workflow_execution_reducer_1_1) {
                workflow_execution_reducer_1 = workflow_execution_reducer_1_1;
            },
            function (dso_model_reducer_1_1) {
                dso_model_reducer_1 = dso_model_reducer_1_1;
            },
            function (workflow_context_reducer_1_1) {
                workflow_context_reducer_1 = workflow_context_reducer_1_1;
            },
            function (sidebar_groups_reducer_1_1) {
                sidebar_groups_reducer_1 = sidebar_groups_reducer_1_1;
            },
            function (ng2_dragula_1_1) {
                ng2_dragula_1 = ng2_dragula_1_1;
            },
            function (menu_reducer_1_1) {
                menu_reducer_1 = menu_reducer_1_1;
            },
            function (user_preferences_reducer_1_1) {
                user_preferences_reducer_1 = user_preferences_reducer_1_1;
            },
            function (widget_settings_reducer_1_1) {
                widget_settings_reducer_1 = widget_settings_reducer_1_1;
            },
            function (dashboard_reducer_1_1) {
                dashboard_reducer_1 = dashboard_reducer_1_1;
            }],
        execute: function() {
            actionLog = function (action) {
                return action.do(function (val) {
                    console.info('DISPATCHED ACTION: ', val);
                });
            };
            stateLog = function (state) {
                return state.do(function (val) {
                    console.info('NEW STATE: ', val);
                });
            };
            /**
             * Reducer Objects provided by the Core Framework
             * @type {{AuthenticationReducer: Reducer<AuthenticationModel>, InitWorkflowReducer: Reducer<any>, WorkflowExecutionReducer: Reducer<Array<WorkflowExecution>>, WorkflowContextReducer: Reducer<Array<WorkflowContext>>, DSOModelReducer: Reducer<DSOModel>}}
             */
            CoreReducers = {
                AuthenticationReducer: authentication_reducer_1.AuthenticationReducer,
                InitWorkflowReducer: init_workflow_reducer_1.InitWorkflowReducer,
                WorkflowExecutionReducer: workflow_execution_reducer_1.WorkflowExecutionReducer,
                WorkflowContextReducer: workflow_context_reducer_1.WorkflowContextReducer,
                DSOModelReducer: dso_model_reducer_1.DSOModelReducer,
                MenuReducer: menu_reducer_1.MenuReducer,
                SidebarUiContainerReducer: sidebar_groups_reducer_1.SidebarUiContainerReducer,
                GroupContextReducer: sidebar_groups_reducer_1.GroupContextReducer,
                UserPreferencesReducer: user_preferences_reducer_1.UserPreferencesReducer,
                WidgetSettingsReducer: widget_settings_reducer_1.WidgetSettingsReducer,
                DashboardReducer: dashboard_reducer_1.DashboardReducer
            };
            /**
             * Reducer Objects provided by the custom implementation
             * @type {{}}
             */
            CustomReducers = {};
            platform_browser_dynamic_1.bootstrap(custom_app_component_1.CustomAppComponent, [
                http_1.HTTP_PROVIDERS,
                core_1.provide(http_1.BrowserXhr, { useClass: custom_browser_xhr_service_1.CustomBrowserXhr }),
                router_deprecated_1.ROUTER_PROVIDERS,
                //provide(LocationStrategy, {useClass: PathLocationStrategy}),
                //provide(APP_BASE_HREF, {useValue: '/'}),
                store_1.provideStore(Object.assign({}, CoreReducers, CustomReducers)),
                core_1.provide(ng2_dragula_1.DragulaService, { useClass: ng2_dragula_1.DragulaService }),
                store_1.usePreMiddleware(actionLog),
                store_1.usePostMiddleware(stateLog)
            ]);
        }
    }
});
//# sourceMappingURL=main.js.map