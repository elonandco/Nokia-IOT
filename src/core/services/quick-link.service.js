System.register(['@angular/core', '@ngrx/store', './app-configuration.service', './browser-store.service', '../reducers/user-preferences.reducer'], function(exports_1, context_1) {
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
    var core_1, store_1, app_configuration_service_1, browser_store_service_1, user_preferences_reducer_1;
    var QuickLinkService;
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
            }],
        execute: function() {
            QuickLinkService = (function () {
                function QuickLinkService(_store, _appConfigService, _browserStoreService) {
                    var _this = this;
                    this._store = _store;
                    this._appConfigService = _appConfigService;
                    this._browserStoreService = _browserStoreService;
                    this._store = _store;
                    this.initWorkflow = this._store.select('InitWorkflowReducer');
                    this.initWorkflow.subscribe(function (data) { return _this.onInitCompleted(data); });
                }
                QuickLinkService.prototype.onInitCompleted = function (data) {
                    if (data && data.hasOwnProperty('status') && data.status === 'completed') {
                        var quickLinksDomain = _.find(this._store.value.DSOModelReducer.domains.domain, { 'id': 'QuickLinks' });
                        if (!quickLinksDomain) {
                            return;
                        }
                        var serviceQuickLinks = quickLinksDomain.services.service;
                        var configQuickLinks_1 = [];
                        _.each(this._appConfigService.getLinkData(), function (quickLink) {
                            var quickLinkParse = quickLink.component.match(/^(.*)LinkComponent.*/);
                            if (quickLinkParse.length > 1) {
                                quickLink.parseName = quickLinkParse[1];
                                configQuickLinks_1.push(quickLink);
                            }
                        });
                        this.quickLinks = _.intersectionWith(serviceQuickLinks, configQuickLinks_1, function (serviceQuickLink, configQuickLink) {
                            if (serviceQuickLink.name === configQuickLink.parseName) {
                                serviceQuickLink.path = configQuickLink.path;
                                serviceQuickLink.component = configQuickLink.component;
                                serviceQuickLink.metadata = configQuickLink.metadata;
                                return true;
                            }
                            return false;
                        });
                        var userSettings = this._browserStoreService.getLocalStorage('userSettings');
                        var localQuickLinks = this.quickLinks;
                        if (userSettings && userSettings.quickLinks) {
                            var storeQuickLinks = userSettings.quickLinks;
                            _.each(storeQuickLinks, function (sw) {
                                var quickLink = _.find(localQuickLinks, function (w) {
                                    return sw.name === w.name;
                                });
                                if (quickLink) {
                                    quickLink.isHidden = sw.isHidden;
                                }
                            });
                        }
                        this.quickLinks = localQuickLinks;
                        _.each(this.quickLinks, function (w) {
                            if (!w.hasOwnProperty('isHidden')) {
                                w.isHidden = false;
                            }
                        });
                        this._store.dispatch({ type: user_preferences_reducer_1.UPDATE_QUICKLINKS, payload: { quickLinks: this.quickLinks } });
                    }
                };
                QuickLinkService.prototype.onLogOut = function () { };
                QuickLinkService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [store_1.Store, app_configuration_service_1.AppConfigurationService, browser_store_service_1.BrowserStoreService])
                ], QuickLinkService);
                return QuickLinkService;
            }());
            exports_1("QuickLinkService", QuickLinkService);
        }
    }
});
//# sourceMappingURL=quick-link.service.js.map