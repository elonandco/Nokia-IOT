System.register(["@angular/core", "@angular/router-deprecated", '@ngrx/store'], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, store_1;
    var UserLinkComponent;
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
            }],
        execute: function() {
            UserLinkComponent = (function () {
                function UserLinkComponent(_router, _store) {
                    this._router = _router;
                    this._store = _store;
                    this.type = 'User';
                    this._store = _store;
                    this.userPrefObs = this._store.select('UserPreferencesReducer');
                    this.userPrefObs.subscribe(function (data) {
                        if (data.quickLinks) {
                        }
                    }, function (error) {
                    });
                }
                UserLinkComponent.prototype.gotoAddUser = function () {
                    this._router.navigate(['User']);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], UserLinkComponent.prototype, "isHidden", void 0);
                UserLinkComponent = __decorate([
                    core_1.Component({
                        selector: 'user-link',
                        template: "\n        <li *ngIf=\"!isHidden\" class=\"user-link\" (click)=\"gotoAddUser()\">\n            <i class=\"ko-user\"></i><span>Add User</span>\n        </li>\n    "
                    }), 
                    __metadata('design:paramtypes', [router_deprecated_1.Router, store_1.Store])
                ], UserLinkComponent);
                return UserLinkComponent;
            }());
            exports_1("UserLinkComponent", UserLinkComponent);
        }
    }
});
//# sourceMappingURL=user-link.component.js.map