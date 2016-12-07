System.register(["@angular/core", "@angular/router-deprecated"], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1;
    var GroupLinkComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            }],
        execute: function() {
            GroupLinkComponent = (function () {
                function GroupLinkComponent(_router) {
                    this._router = _router;
                    this.type = 'Group';
                }
                GroupLinkComponent.prototype.gotoAddGroup = function () {
                    this._router.navigate(['UserGroup']);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], GroupLinkComponent.prototype, "isHidden", void 0);
                GroupLinkComponent = __decorate([
                    core_1.Component({
                        selector: 'group-link',
                        template: "\n        <li *ngIf=\"!isHidden\" class=\"user-group-link\" (click)=\"gotoAddGroup()\">\n            <i class=\"ko-user-group\"></i><span>Add Group</span>\n        </li>\n    "
                    }), 
                    __metadata('design:paramtypes', [router_deprecated_1.Router])
                ], GroupLinkComponent);
                return GroupLinkComponent;
            }());
            exports_1("GroupLinkComponent", GroupLinkComponent);
        }
    }
});
//# sourceMappingURL=group-link.component.js.map