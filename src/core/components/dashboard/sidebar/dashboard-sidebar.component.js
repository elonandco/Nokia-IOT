System.register(['@angular/core', '@angular/http', '@ngrx/store', '../sidebar-groups/sidebar-groups.component', '../sidebar-widgets/sidebar-widgets.component'], function(exports_1, context_1) {
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
    var core_1, http_1, store_1, sidebar_groups_component_1, sidebar_widgets_component_1;
    var DashboardSidebarComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (sidebar_groups_component_1_1) {
                sidebar_groups_component_1 = sidebar_groups_component_1_1;
            },
            function (sidebar_widgets_component_1_1) {
                sidebar_widgets_component_1 = sidebar_widgets_component_1_1;
            }],
        execute: function() {
            DashboardSidebarComponent = (function () {
                function DashboardSidebarComponent(_store, _http) {
                    var _this = this;
                    this._store = _store;
                    this._http = _http;
                    this.sidebarActive = false;
                    this.treeJson = {};
                    this.whoActive = _store.select('SidebarUiContainerReducer');
                    this.dsoObs = _store.select('DSOModelReducer');
                    this.whoActive.subscribe(function (data) {
                        _this.sidebarActive = (data === "widget" || data === "group") ? true : false;
                    }, function (error) {
                        console.log('Error:', +error);
                    });
                }
                DashboardSidebarComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.dsoObs.subscribe(function (data) {
                        var domains = _.find(data.domains.domain, function (domain) {
                            return domain.id === "GroupTree";
                        });
                        if (domains && domains.services && domains.services.service) {
                            var groups = domains.services.service[0].attributes.groups;
                            if (groups && typeof groups === 'string') {
                                _this.treeJson['groups'] = JSON.parse(groups);
                            }
                            else {
                                _this.treeJson['groups'] = groups;
                            }
                        }
                    }, function (error) {
                        console.log('Error on initializing the tree data.');
                    });
                };
                DashboardSidebarComponent = __decorate([
                    core_1.Component({
                        selector: 'dashboard-sidebar',
                        directives: [sidebar_groups_component_1.SidebarGroupComponent, sidebar_widgets_component_1.SidebarWidgetComponent],
                        templateUrl: '/src/core/components/dashboard/sidebar/dashboard-sidebar.component.html'
                    }), 
                    __metadata('design:paramtypes', [store_1.Store, http_1.Http])
                ], DashboardSidebarComponent);
                return DashboardSidebarComponent;
            }());
            exports_1("DashboardSidebarComponent", DashboardSidebarComponent);
        }
    }
});
//# sourceMappingURL=dashboard-sidebar.component.js.map