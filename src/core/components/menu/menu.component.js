System.register(['@angular/core', '@angular/router-deprecated', '@ngrx/store', "../../reducers/menu.reducer", "../../../core/services/dynamic-route-configurator.service"], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, store_1, menu_reducer_1, dynamic_route_configurator_service_1;
    var MenuComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (menu_reducer_1_1) {
                menu_reducer_1 = menu_reducer_1_1;
            },
            function (dynamic_route_configurator_service_1_1) {
                dynamic_route_configurator_service_1 = dynamic_route_configurator_service_1_1;
            }],
        execute: function() {
            MenuComponent = (function () {
                function MenuComponent(_router, _store, _drc) {
                    this._router = _router;
                    this._store = _store;
                    this._drc = _drc;
                    this.menu = {};
                }
                /**
                 * Either route directly to service or toggle the operation menu if there is any. It also emits an event hide the menu component.
                 * @param serviceView
                 * @param routeName
                 * @returns void
                 */
                MenuComponent.prototype.navigateToService = function (serviceView, routeName) {
                    if (serviceView.operations.length === 0) {
                        this._store.dispatch({ type: menu_reducer_1.CLOSE_MENU });
                        this._router.navigate([routeName]);
                    }
                };
                /**
                 * Route to destination page. It also emits an event hide the menu component.
                 * @param routeName
                 * @returns void
                 */
                MenuComponent.prototype.navigateToOperation = function (routeName) {
                    this._store.dispatch({ type: menu_reducer_1.CLOSE_MENU });
                    this._router.navigate([routeName]);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], MenuComponent.prototype, "services", void 0);
                MenuComponent = __decorate([
                    core_1.Component({
                        selector: 'menu',
                        templateUrl: '/src/core/components/menu/menu.component.html',
                        styles: ["\n    .tree-menu a::after{\n      content:\"\";\n    }\n    .ko-Test_Flows::before,\n    .ko-MY_WF::before {\n      content:\"\\e99b\";\n    }\n  "]
                    }), 
                    __metadata('design:paramtypes', [router_deprecated_1.Router, store_1.Store, dynamic_route_configurator_service_1.DynamicRouteConfiguratorService])
                ], MenuComponent);
                return MenuComponent;
            }());
            exports_1("MenuComponent", MenuComponent);
        }
    }
});
//# sourceMappingURL=menu.component.js.map