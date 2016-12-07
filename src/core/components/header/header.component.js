System.register(['@angular/core', '@angular/router-deprecated', '../alert/alert.component', '../auth/logout.component', '@ngrx/store', "../../reducers/menu.reducer"], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, alert_component_1, logout_component_1, store_1, menu_reducer_1;
    var HeaderComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (alert_component_1_1) {
                alert_component_1 = alert_component_1_1;
            },
            function (logout_component_1_1) {
                logout_component_1 = logout_component_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (menu_reducer_1_1) {
                menu_reducer_1 = menu_reducer_1_1;
            }],
        execute: function() {
            HeaderComponent = (function () {
                function HeaderComponent(_store, _router) {
                    var _this = this;
                    this._store = _store;
                    this._router = _router;
                    this.loggedIn = false;
                    this.firstName = "";
                    this.lastName = "";
                    this._store = _store;
                    this.initWorkflow = this._store.select('InitWorkflowReducer');
                    this.initWorkflow.subscribe(function (data) { return _this.onInitCompleted(data); });
                    this.loggedIn$ = this._store.select('AuthenticationReducer');
                    this.loggedIn$.subscribe(function (data) { return _this.isLoggedOut(data); });
                    this.dsoObs = this._store.select('DSOModelReducer');
                    this.dsoObs.subscribe(function (data) { return _this.updateUserInfo(data); });
                }
                HeaderComponent.prototype.updateUserInfo = function (data) {
                    if (data != undefined && data.hasOwnProperty('firstName')) {
                        this.firstName = data.firstName;
                    }
                    if (data != undefined && data.hasOwnProperty('lastName')) {
                        this.lastName = data.lastName;
                    }
                };
                HeaderComponent.prototype.onInitCompleted = function (data) {
                    this.loggedIn = data.status === "completed";
                };
                HeaderComponent.prototype.isLoggedOut = function (data) {
                    if (!data.sessionId) {
                        this.loggedIn = false;
                    }
                };
                HeaderComponent.prototype.toggleMenu = function () {
                    this._store.dispatch({ type: menu_reducer_1.TOGGLE_MENU });
                };
                HeaderComponent.prototype.refreshDashboard = function () {
                    location.reload();
                };
                HeaderComponent.prototype.goToDashboard = function () {
                    var link = ['Dashboard'];
                    this._router.navigate(link);
                };
                HeaderComponent = __decorate([
                    core_1.Component({
                        selector: 'navbar-header',
                        directives: [alert_component_1.AlertComponent, logout_component_1.LogoutComponent],
                        templateUrl: '/src/core/components/header/header.component.html'
                    }), 
                    __metadata('design:paramtypes', [store_1.Store, router_deprecated_1.Router])
                ], HeaderComponent);
                return HeaderComponent;
            }());
            exports_1("HeaderComponent", HeaderComponent);
        }
    }
});
//# sourceMappingURL=header.component.js.map