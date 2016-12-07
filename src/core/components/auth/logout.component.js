System.register(['@angular/core', '@angular/router-deprecated', '../../services/authentication.service'], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, authentication_service_1;
    var LogoutComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }],
        execute: function() {
            LogoutComponent = (function () {
                function LogoutComponent(_router, _authService) {
                    this._router = _router;
                    this._authService = _authService;
                }
                LogoutComponent.prototype.onLogout = function () {
                    this._authService.logout()
                        .subscribe(function () {
                        /*TEMPORAL FIX: the store is not getting reset*/
                        //this._router.navigate(['Login']);
                        window.location.replace('/login');
                    });
                };
                LogoutComponent = __decorate([
                    core_1.Component({
                        selector: 'logout',
                        directives: [],
                        template: "\n    <button type=\"button\" class=\"btn btn-default nokia-logout\" (click)=\"onLogout()\">\n      <i class=\"jstree-icon jstree-themeicon ko-x-square main-link jstree-themeicon-custom\"></i>\n    Log Out</button>\n  "
                    }), 
                    __metadata('design:paramtypes', [router_deprecated_1.Router, authentication_service_1.AuthenticationService])
                ], LogoutComponent);
                return LogoutComponent;
            }());
            exports_1("LogoutComponent", LogoutComponent);
        }
    }
});
//# sourceMappingURL=logout.component.js.map