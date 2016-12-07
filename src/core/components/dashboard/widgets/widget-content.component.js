System.register(["@angular/core"], function(exports_1, context_1) {
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
    var core_1;
    var WidgetContentComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            /**
             * Created by jlmayorga on 2/29/16.
             */
            WidgetContentComponent = (function () {
                function WidgetContentComponent() {
                }
                WidgetContentComponent.prototype.commonMethod = function () { };
                WidgetContentComponent = __decorate([
                    core_1.Component({
                        selector: "widget-content",
                        template: "\n    YOU SHOULD BE OVER-RIDDING THE TEMPLATE. YOU DID NOT DO THAT. BAD YOU.\n    -Love IOT Core Team <3\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], WidgetContentComponent);
                return WidgetContentComponent;
            }());
            exports_1("WidgetContentComponent", WidgetContentComponent);
        }
    }
});
//# sourceMappingURL=widget-content.component.js.map