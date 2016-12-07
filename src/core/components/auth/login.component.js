System.register(['@angular/core', '@angular/common', '@angular/router-deprecated', '../../services/authentication.service', "../tooltip/tooltip.directive", '@ngrx/store', "../../reducers/dashboard.reducer"], function(exports_1, context_1) {
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
    var core_1, common_1, router_deprecated_1, authentication_service_1, tooltip_directive_1, store_1, dashboard_reducer_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (tooltip_directive_1_1) {
                tooltip_directive_1 = tooltip_directive_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (dashboard_reducer_1_1) {
                dashboard_reducer_1 = dashboard_reducer_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(_fb, _authService, _router, _store) {
                    this._fb = _fb;
                    this._authService = _authService;
                    this._router = _router;
                    this._store = _store;
                    this._error = false;
                    this.isRoot = true;
                    this.isTooltip = false;
                    this._loginForm = _fb.group({
                        username: ['', common_1.Validators.required],
                        password: ['', common_1.Validators.required]
                    });
                }
                LoginComponent.prototype.doLogin = function () {
                    var _this = this;
                    this._authService.login(this._loginForm.value.username, this._loginForm.value.password, this.isRoot).subscribe(function (data) {
                        _this._store.dispatch({ type: dashboard_reducer_1.DASHBOARD_CREATE });
                        var link = ['Dashboard'];
                        _this._router.navigate(link);
                    }, function (err) {
                        _this._error = true;
                    });
                };
                LoginComponent.prototype.handleRadioButtonClick = function (value) {
                    value === 'root' ? this.isRoot = true : this.isRoot = false;
                };
                LoginComponent.prototype.toggleTooltip = function () {
                    return this.isTooltip = !this.isTooltip;
                };
                LoginComponent.prototype.routerOnActivate = function (next, prev) {
                    //TODO: Performance any action on login touter
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'login',
                        directives: [common_1.FORM_DIRECTIVES, common_1.NgIf, tooltip_directive_1.TooltipDirective],
                        templateUrl: '/src/core/components/auth/login.component.html'
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, authentication_service_1.AuthenticationService, router_deprecated_1.Router, store_1.Store])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map