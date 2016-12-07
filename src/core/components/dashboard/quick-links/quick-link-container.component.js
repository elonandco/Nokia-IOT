System.register(["@angular/core", "../../../services/app-configuration.service", '@ngrx/store', "../../../reducers/sidebar-groups.reducer", "@angular/router-deprecated", "../../../../core/services/dynamic-route-configurator.service"], function(exports_1, context_1) {
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
    var core_1, app_configuration_service_1, store_1, sidebar_groups_reducer_1, router_deprecated_1, dynamic_route_configurator_service_1;
    var QuickLinkContainerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_configuration_service_1_1) {
                app_configuration_service_1 = app_configuration_service_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (sidebar_groups_reducer_1_1) {
                sidebar_groups_reducer_1 = sidebar_groups_reducer_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (dynamic_route_configurator_service_1_1) {
                dynamic_route_configurator_service_1 = dynamic_route_configurator_service_1_1;
            }],
        execute: function() {
            QuickLinkContainerComponent = (function () {
                function QuickLinkContainerComponent(_dcl, _router, _appConfigService, _store, _drc) {
                    var _this = this;
                    this._dcl = _dcl;
                    this._router = _router;
                    this._appConfigService = _appConfigService;
                    this._store = _store;
                    this._drc = _drc;
                    this.loaded = false;
                    this.compRefs = [];
                    this._store = _store;
                    this.userPrefObs = this._store.select('UserPreferencesReducer');
                    this.userPrefObs.subscribe(function (data) {
                        if (_this.loaded) {
                            for (var i = 0; i < _this.compRefs.length; i++) {
                                var refs = _this.compRefs;
                                var link = _.find(_this._store.value.UserPreferencesReducer.quickLinks, function (ql) {
                                    return ql.name === refs[i].instance.type;
                                });
                                if (link) {
                                    refs[i].instance['isHidden'] = link.isHidden;
                                }
                            }
                            return;
                        }
                        if (data.quickLinks) {
                            _this.loaded = true;
                            _this.loadWQuickLinks(data.quickLinks);
                        }
                    }, function (error) {
                    });
                }
                QuickLinkContainerComponent.prototype.loadWQuickLinks = function (quickLinks) {
                    for (var i = 0; i < quickLinks.length; i++) {
                        this.loadQuickLink(quickLinks[i]);
                    }
                };
                QuickLinkContainerComponent.prototype.loadQuickLink = function (quickLink) {
                    var _this = this;
                    // load quick link components
                    System.import(quickLink.path).then(function (componentModule) { return componentModule[quickLink.component]; }).then(function (component) {
                        _this._dcl.loadNextToLocation(component, _this.childContentPlace).then(function (compRef) {
                            compRef.instance['isHidden'] = quickLink.isHidden;
                            _this.compRefs.push(compRef);
                        });
                    });
                };
                QuickLinkContainerComponent.prototype.toggleWidget = function () {
                    this._store.dispatch({ type: sidebar_groups_reducer_1.TOGGLE_SIDEBAR_WIDGET });
                };
                QuickLinkContainerComponent.prototype.toggleGroup = function () {
                    this._store.dispatch({ type: sidebar_groups_reducer_1.TOGGLE_SIDEBAR_GROUP });
                };
                QuickLinkContainerComponent.prototype.launchAddCampaign = function () {
                    console.log('launching add campagin flow');
                    this._router.navigate(['EAP_IOT_ADD_CAMPAIGN']);
                };
                QuickLinkContainerComponent.prototype.launchAddFirmware = function () {
                    console.log('launching add firmware flow');
                    this._router.navigate(['EAP_IOT_ADD_FIRMWARE']);
                };
                __decorate([
                    core_1.ViewChild('link', { read: core_1.ViewContainerRef }), 
                    __metadata('design:type', core_1.ViewContainerRef)
                ], QuickLinkContainerComponent.prototype, "childContentPlace", void 0);
                QuickLinkContainerComponent = __decorate([
                    core_1.Component({
                        selector: 'quick-link-container',
                        templateUrl: '/src/core/components/dashboard/quick-links/quick-link-container.component.html',
                    }), 
                    __metadata('design:paramtypes', [core_1.DynamicComponentLoader, router_deprecated_1.Router, app_configuration_service_1.AppConfigurationService, store_1.Store, dynamic_route_configurator_service_1.DynamicRouteConfiguratorService])
                ], QuickLinkContainerComponent);
                return QuickLinkContainerComponent;
            }());
            exports_1("QuickLinkContainerComponent", QuickLinkContainerComponent);
        }
    }
});
//# sourceMappingURL=quick-link-container.component.js.map