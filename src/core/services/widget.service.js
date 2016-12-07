System.register(['@angular/core', '@ngrx/store', './app-configuration.service', './browser-store.service', '../reducers/user-preferences.reducer', 'lodash'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, store_1, app_configuration_service_1, browser_store_service_1, user_preferences_reducer_1, _;
    var WidgetService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (app_configuration_service_1_1) {
                app_configuration_service_1 = app_configuration_service_1_1;
            },
            function (browser_store_service_1_1) {
                browser_store_service_1 = browser_store_service_1_1;
            },
            function (user_preferences_reducer_1_1) {
                user_preferences_reducer_1 = user_preferences_reducer_1_1;
            },
            function (_1) {
                _ = _1;
            }],
        execute: function() {
            WidgetService = (function () {
                function WidgetService(_store, _appConfigService, _browserStoreService) {
                    var _this = this;
                    this._store = _store;
                    this._appConfigService = _appConfigService;
                    this._browserStoreService = _browserStoreService;
                    this._store = _store;
                    this.initWorkflow = this._store.select('InitWorkflowReducer');
                    this.initWorkflow.subscribe(function (data) { return _this.onInitCompleted(data); });
                }
                WidgetService.prototype.onInitCompleted = function (data) {
                    if (data && data.hasOwnProperty('status') && data.status === 'completed') {
                        var serviceWidgets = _.find(this._store.value.DSOModelReducer.domains.domain, { 'id': 'Widgets' }).services.service;
                        var configWidgets_1 = [];
                        _.each(this._appConfigService.getWidgetsData(), function (widget) {
                            var widgetParse = widget.component.match(/^(.*)Widget.*/);
                            if (widgetParse.length > 1) {
                                widget.parseName = widgetParse[1];
                                configWidgets_1.push(widget);
                            }
                        });
                        this.widgets = _.intersectionWith(serviceWidgets, configWidgets_1, function (serviceWidget, configWidget) {
                            if (serviceWidget.name === configWidget.parseName) {
                                serviceWidget.path = configWidget.path;
                                serviceWidget.component = configWidget.component;
                                serviceWidget.settings = configWidget.defaultSettings;
                                serviceWidget.metadata = configWidget.metadata;
                                return true;
                            }
                            return false;
                        });
                        var useSettings = this._browserStoreService.getLocalStorage('userSettings');
                        var localWidgets = this.widgets;
                        if (useSettings) {
                            if (useSettings.widgetOrder) {
                                this._store.dispatch({ type: user_preferences_reducer_1.WIDGET_REORDER, payload: useSettings.widgetOrder });
                            }
                            if (useSettings.widgets) {
                                var storeWidgets = useSettings.widgets;
                                _.each(storeWidgets, function (sw) {
                                    var widget = _.find(localWidgets, function (w) {
                                        return sw.name === w.name;
                                    });
                                    if (widget) {
                                        widget.isHidden = sw.isHidden;
                                        _.forIn(widget.settings, function (value, key) {
                                            if (sw.settings && sw.settings.hasOwnProperty(key)) {
                                                widget.settings[key] = sw.settings[key];
                                            }
                                        });
                                    }
                                });
                            }
                        }
                        this.widgets = localWidgets;
                        _.each(this.widgets, function (w) {
                            if (!w.hasOwnProperty('isHidden')) {
                                w.previousHidden = false;
                                w.isHidden = false;
                            }
                        });
                        this._store.dispatch({ type: user_preferences_reducer_1.UPDATE_WIDGETS, payload: { widgets: this.widgets } });
                    }
                };
                WidgetService.prototype.onLogOut = function () { };
                WidgetService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [store_1.Store, app_configuration_service_1.AppConfigurationService, browser_store_service_1.BrowserStoreService])
                ], WidgetService);
                return WidgetService;
            }());
            exports_1("WidgetService", WidgetService);
        }
    }
});
//# sourceMappingURL=widget.service.js.map