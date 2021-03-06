System.register(['@angular/core', '@angular/http', '@ngrx/store', './app-configuration.service', '../reducers/authentication.reducer'], function(exports_1, context_1) {
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
    var core_1, http_1, store_1, app_configuration_service_1, authentication_reducer_1;
    var AuthenticationService;
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
            function (app_configuration_service_1_1) {
                app_configuration_service_1 = app_configuration_service_1_1;
            },
            function (authentication_reducer_1_1) {
                authentication_reducer_1 = authentication_reducer_1_1;
            }],
        execute: function() {
            AuthenticationService = (function () {
                function AuthenticationService(http, config, store) {
                    this.http = http;
                    this.config = config;
                    this.store = store;
                }
                AuthenticationService.prototype.onLogOut = function () {
                };
                AuthenticationService.prototype.validate = function () {
                    var _this = this;
                    var request = this.http.post(this.config.getServerUrl() + '/ssc/auth/1.0/validate?features=acceptEventData&beginFlowMode=ALL', null, null)
                        .map(function (res) { return res.json(); })
                        .share();
                    request.subscribe(function (data) {
                        if (!data.attributes) {
                            data.attributes = {};
                        }
                        data.attributes["isRoot"] = _this.isRoot; //TODO: look for isRoot in the store
                        data.attributes["beginFlowMode"] = "ALL";
                        _this.store.dispatch({ type: authentication_reducer_1.LOGIN, payload: data });
                    }, function (err) {
                    });
                    return request;
                };
                AuthenticationService.prototype.login = function (username, password, isRoot) {
                    var _this = this;
                    var creds = "username=" + username + "&password=" + password + "&isRoot=" + isRoot + "&features=acceptEventData&beginFlowMode=ALL";
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    var request = this.http.post(this.config.getServerUrl() + '/ssc/auth/1.0/login', creds, {
                        headers: headers
                    }).map(function (res) { return res.json(); }).share();
                    request.subscribe(function (data) {
                        if (!data.attributes) {
                            data.attributes = {};
                        }
                        _this.isRoot = isRoot;
                        data.attributes["isRoot"] = isRoot;
                        data.attributes["beginFlowMode"] = "ALL";
                        _this.store.dispatch({ type: authentication_reducer_1.LOGIN, payload: data });
                        _this.keepAlive();
                    }, function (err) {
                    });
                    return request;
                };
                AuthenticationService.prototype.logout = function () {
                    var _this = this;
                    var request = this.http.get(this.config.getServerUrl() + '/ssc/auth/1.0/logout')
                        .share();
                    request.subscribe(function (data) {
                        _this.store.dispatch({ type: "@@ngrx/INIT" });
                        _this.store.dispatch({ type: "CLOSE_MENU" });
                        _this.store.dispatch({ type: authentication_reducer_1.LOGOUT });
                    });
                    return request;
                };
                AuthenticationService.prototype.keepAlive = function () {
                    //   console.log('keep');
                    //   setInterval(this.validate,1000 )
                };
                AuthenticationService.prototype.timeout = function () {
                    return true;
                };
                AuthenticationService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, app_configuration_service_1.AppConfigurationService, store_1.Store])
                ], AuthenticationService);
                return AuthenticationService;
            }());
            exports_1("AuthenticationService", AuthenticationService);
        }
    }
});
//# sourceMappingURL=authentication.service.js.map