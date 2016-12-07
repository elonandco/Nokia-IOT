System.register(['@angular/core', '@angular/router-deprecated', '../core/components/header/header.component', '../core/services/dynamic-route-configurator.service', '../core/services/app-configuration.service', '../core/services/authentication.service', '../core/services/widget.service', '../core/services/quick-link.service', './components/dashboard/quick-links/device.component', '../core/app', '../core/components/menu/menu.component', '../core/components/menu/menu.model', '../core/services/ssc-workflow-execution.service', '../core/services/browser-store.service', '@ngrx/store', "../core/reducers/dashboard.reducer"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_deprecated_1, header_component_1, dynamic_route_configurator_service_1, app_configuration_service_1, authentication_service_1, widget_service_1, quick_link_service_1, device_component_1, app_1, menu_component_1, menu_model_1, ssc_workflow_execution_service_1, browser_store_service_1, store_1, dashboard_reducer_1;
    var CustomAppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (header_component_1_1) {
                header_component_1 = header_component_1_1;
            },
            function (dynamic_route_configurator_service_1_1) {
                dynamic_route_configurator_service_1 = dynamic_route_configurator_service_1_1;
            },
            function (app_configuration_service_1_1) {
                app_configuration_service_1 = app_configuration_service_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (widget_service_1_1) {
                widget_service_1 = widget_service_1_1;
            },
            function (quick_link_service_1_1) {
                quick_link_service_1 = quick_link_service_1_1;
            },
            function (device_component_1_1) {
                device_component_1 = device_component_1_1;
            },
            function (app_1_1) {
                app_1 = app_1_1;
            },
            function (menu_component_1_1) {
                menu_component_1 = menu_component_1_1;
            },
            function (menu_model_1_1) {
                menu_model_1 = menu_model_1_1;
            },
            function (ssc_workflow_execution_service_1_1) {
                ssc_workflow_execution_service_1 = ssc_workflow_execution_service_1_1;
            },
            function (browser_store_service_1_1) {
                browser_store_service_1 = browser_store_service_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (dashboard_reducer_1_1) {
                dashboard_reducer_1 = dashboard_reducer_1_1;
            }],
        execute: function() {
            CustomAppComponent = (function (_super) {
                __extends(CustomAppComponent, _super);
                function CustomAppComponent(_router, _widgetService, _quickLinkService, _authenticationService, _acs, _store) {
                    var _this = this;
                    _super.call(this);
                    this._router = _router;
                    this._widgetService = _widgetService;
                    this._quickLinkService = _quickLinkService;
                    this._authenticationService = _authenticationService;
                    this._acs = _acs;
                    this._store = _store;
                    this.isMenuActive = false;
                    this.domainView = new menu_model_1.DomainView();
                    this._router.config(this._getDefaultRouterConfig());
                    this._store = _store;
                    this.menu$ = this._store.select('MenuReducer');
                    this.menu$.subscribe(function (data) {
                        _this.isMenuActive = data;
                    }, function (error) {
                        console.log('Error:', +error);
                    });
                    this.dsoModel$ = this._store.select('DSOModelReducer');
                    this.dsoModel$.subscribe(function (data) {
                        _this.domainView = _this.jsonToMenuModel(data);
                    }, function (error) {
                        console.log('Error: ', error);
                    });
                }
                CustomAppComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._acs.loadConfiguration().subscribe(function (res) {
                        _this.validate();
                    });
                };
                CustomAppComponent.prototype.jsonToMenuModel = function (json) {
                    var menuDomain = new menu_model_1.DomainView();
                    if (json && json.domains) {
                        json.domains.domain.forEach(function (domain) {
                            if (domain.id === 'Menu') {
                                menuDomain.id = domain.id;
                                if (domain.services) {
                                    domain.services.service.forEach(function (service) {
                                        var menuService = new menu_model_1.ServiceView();
                                        menuService.id = service.id;
                                        menuService.name = service.name;
                                        if (service.operations) {
                                            service.operations.operation.forEach(function (op) {
                                                var menuOperation = new menu_model_1.OperationView();
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
                };
                CustomAppComponent.prototype.validate = function () {
                    var _this = this;
                    this._authenticationService.validate().subscribe(function (data) {
                        _this._store.dispatch({ type: dashboard_reducer_1.DASHBOARD_CREATE });
                        var link = ['Dashboard'];
                        _this._router.navigate(link);
                    }, function (err) {
                        var link = ['Login'];
                        _this._router.navigate(link);
                    });
                };
                CustomAppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'src/custom/custom-app.component.html',
                        directives: [
                            router_deprecated_1.ROUTER_DIRECTIVES,
                            header_component_1.HeaderComponent,
                            menu_component_1.MenuComponent
                        ],
                        providers: [dynamic_route_configurator_service_1.DynamicRouteConfiguratorService,
                            app_configuration_service_1.AppConfigurationService,
                            browser_store_service_1.BrowserStoreService,
                            authentication_service_1.AuthenticationService,
                            quick_link_service_1.QuickLinkService,
                            widget_service_1.WidgetService,
                            ssc_workflow_execution_service_1.SSCWorkflowExecutionService]
                    }),
                    router_deprecated_1.RouteConfig([
                        {
                            path: '/device',
                            name: 'Device',
                            component: device_component_1.DeviceComponent
                        }
                    ]), 
                    __metadata('design:paramtypes', [router_deprecated_1.Router, widget_service_1.WidgetService, quick_link_service_1.QuickLinkService, authentication_service_1.AuthenticationService, app_configuration_service_1.AppConfigurationService, store_1.Store])
                ], CustomAppComponent);
                return CustomAppComponent;
            }(app_1.App));
            exports_1("CustomAppComponent", CustomAppComponent);
        }
    }
});
//# sourceMappingURL=custom-app.component.js.map