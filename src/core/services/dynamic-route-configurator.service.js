System.register(["@angular/core", "@angular/router-deprecated", "../../custom/custom-app.component"], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, custom_app_component_1;
    var DynamicRouteConfiguratorService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (custom_app_component_1_1) {
                custom_app_component_1 = custom_app_component_1_1;
            }],
        execute: function() {
            DynamicRouteConfiguratorService = (function () {
                function DynamicRouteConfiguratorService(registry) {
                    this.registry = registry;
                    this.component = custom_app_component_1.CustomAppComponent;
                }
                DynamicRouteConfiguratorService.prototype.addRoute = function (route) {
                    //TODO: This is a hack to prevent adding the same route again when reloading a component (constructor will be invoked again)
                    //TODO: find a better way of doing this!
                    if (!this.registry.hasRoute(route.name, this.component)) {
                        var routeConfig = this.getRoutes();
                        routeConfig.configs.push(route);
                        this.updateRouteConfig(routeConfig);
                        this.registry.config(this.component, route);
                    }
                };
                DynamicRouteConfiguratorService.prototype.getRoutes = function () {
                    return Reflect.getMetadata('annotations', this.component)
                        .filter(function (a) {
                        //return a.constructor.name === 'RouteConfig';
                        return a.constructor.toString().match(/function (.{1,})\(/)[1] === 'RouteConfig';
                    }).pop();
                };
                DynamicRouteConfiguratorService.prototype.updateRouteConfig = function (routeConfig) {
                    var annotations = Reflect.getMetadata('annotations', this.component);
                    var routeConfigIndex = -1;
                    for (var i = 0; i < annotations.length; i += 1) {
                        if (annotations[i].constructor.toString().match(/function (.{1,})\(/)[1] === 'RouteConfig') {
                            routeConfigIndex = i;
                            break;
                        }
                    }
                    if (routeConfigIndex < 0) {
                        throw new Error('No route metadata attached to the component');
                    }
                    annotations[routeConfigIndex] = routeConfig;
                    Reflect.defineMetadata('annotations', annotations, this.component);
                };
                DynamicRouteConfiguratorService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [router_deprecated_1.RouteRegistry])
                ], DynamicRouteConfiguratorService);
                return DynamicRouteConfiguratorService;
            }());
            exports_1("DynamicRouteConfiguratorService", DynamicRouteConfiguratorService);
        }
    }
});
//# sourceMappingURL=dynamic-route-configurator.service.js.map