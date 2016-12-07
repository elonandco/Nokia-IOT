System.register(["@angular/core", "./quick-links/quick-link-container.component", "./sidebar/dashboard-sidebar.component", "./widgets/widget-container.component", "../init/init.component", '@ngrx/store'], function(exports_1, context_1) {
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
    var core_1, quick_link_container_component_1, dashboard_sidebar_component_1, widget_container_component_1, init_component_1, store_1;
    var DashboardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (quick_link_container_component_1_1) {
                quick_link_container_component_1 = quick_link_container_component_1_1;
            },
            function (dashboard_sidebar_component_1_1) {
                dashboard_sidebar_component_1 = dashboard_sidebar_component_1_1;
            },
            function (widget_container_component_1_1) {
                widget_container_component_1 = widget_container_component_1_1;
            },
            function (init_component_1_1) {
                init_component_1 = init_component_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            }],
        execute: function() {
            DashboardComponent = (function () {
                function DashboardComponent(_store, _dcl) {
                    var _this = this;
                    this._store = _store;
                    this._dcl = _dcl;
                    this.isOverlayActive = false;
                    this.hideDash = true;
                    this.menuObs = this._store.select('MenuReducer');
                    this.menuObs.subscribe(function (data) {
                        _this.isOverlayActive = data;
                    }, function (error) {
                        console.log('Error:', error);
                    });
                    this.widgetQLObs = this._store.select('SidebarUiContainerReducer');
                    this.widgetQLObs.subscribe(function (data) {
                        _this.widgetDragActive = false;
                        _this.widgetGroupActive = false;
                        switch (data) {
                            case "widget": {
                                _this.widgetDragActive = true;
                                break;
                            }
                            case "group": {
                                _this.widgetGroupActive = true;
                                break;
                            }
                        }
                    }, function (error) {
                        console.log('Error:', error);
                    });
                    this.groupsObs = this._store.select('GroupContextReducer');
                    this.groupsObs.subscribe(function (data) {
                        //todo:
                        _this.hideDash = true;
                    }, function (error) {
                        console.log('Error:', error);
                    });
                }
                DashboardComponent.prototype.ngOnInit = function () {
                    this.mode = this._store.value.DashboardReducer;
                    if (this.mode && this.mode === "create") {
                        this.hideDash = true;
                    }
                    else {
                        this.hideDash = false;
                    }
                    delete this._store.value.DashboardReducer;
                };
                DashboardComponent.prototype.handleInitComponentEvent = function (event) {
                    this.hideDash = false;
                };
                DashboardComponent.prototype.isDone = function (done) {
                    this.hideDash = false;
                };
                DashboardComponent.prototype.routerOnActivate = function (next, prev) {
                };
                DashboardComponent.prototype.routerOnDeactivate = function (next, prev) {
                };
                DashboardComponent.prototype.routerCanReuse = function (next, prev) {
                    return true;
                };
                DashboardComponent.prototype.routerOnReuse = function (next, prev) {
                    console.log("reusing dashboard-component");
                };
                DashboardComponent.prototype.ngOnDestroy = function () {
                    console.log("Destruying dashboard-component");
                };
                DashboardComponent = __decorate([
                    core_1.Component({
                        selector: 'dashboard-component',
                        templateUrl: '/src/core/components/dashboard/dashboard.component.html',
                        directives: [quick_link_container_component_1.QuickLinkContainerComponent, dashboard_sidebar_component_1.DashboardSidebarComponent, init_component_1.InitComponent, widget_container_component_1.WidgetContainerComponent]
                    }), 
                    __metadata('design:paramtypes', [store_1.Store, core_1.DynamicComponentLoader])
                ], DashboardComponent);
                return DashboardComponent;
            }());
            exports_1("DashboardComponent", DashboardComponent);
        }
    }
});
//# sourceMappingURL=dashboard.component.js.map