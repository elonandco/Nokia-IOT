System.register(['@angular/http', '@angular/core'], function(exports_1, context_1) {
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
    var http_1, core_1;
    var AppConfigurationService;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AppConfigurationService = (function () {
                function AppConfigurationService(_http) {
                    this._http = _http;
                }
                AppConfigurationService.prototype.loadConfiguration = function () {
                    var _this = this;
                    var request = this._http.get('src/custom/config.json')
                        .map(function (res) { return res.json(); }).share();
                    request.subscribe(function (res) {
                        _this._configData = res;
                    }, // onNext
                    function (// onNext
                        err) { return console.error(err); }, // onError
                    function () { return console.log('AppConfiguration service is completed.'); } // onCompleted
                     // onCompleted
                    );
                    return request;
                };
                AppConfigurationService.prototype.getConfigurationData = function () {
                    return this._configData;
                };
                AppConfigurationService.prototype.getWidgetsData = function () {
                    return this._configData.widgets;
                };
                AppConfigurationService.prototype.getWidgetData = function (name) {
                    for (var i = 0; i < this._configData.widgets.length; i++) {
                        if (this._configData.widgets[i].component === name) {
                            return this._configData.widgets[i];
                        }
                    }
                    return this._configData.widgets;
                };
                AppConfigurationService.prototype.getLinkData = function () {
                    return this._configData.links;
                };
                AppConfigurationService.prototype.getWorkflowConfiguration = function () {
                    return this._configData.workflow;
                };
                AppConfigurationService.prototype.getInitWorkflow = function () {
                    return this._configData.workflow.initWorkflowName;
                };
                AppConfigurationService.prototype.getServerUrl = function () {
                    return this._configData.server.url;
                };
                AppConfigurationService.prototype.getPollingInterval = function () {
                    return this._configData.server.pollingInteval || 5000;
                };
                AppConfigurationService.prototype.getBreadcrumbIgnoredNodes = function () {
                    return this._configData.workflow.breadcrumbIgnoredNodes;
                };
                AppConfigurationService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AppConfigurationService);
                return AppConfigurationService;
            }());
            exports_1("AppConfigurationService", AppConfigurationService);
        }
    }
});
//# sourceMappingURL=app-configuration.service.js.map