System.register(['@angular/core', '@angular/router-deprecated', '@ngrx/store'], function(exports_1, context_1) {
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
    var SpinnerComponent;
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
            /**
             * Created by jlmayorga on 4/18/16.
             */
            SpinnerComponent = (function () {
                function SpinnerComponent(_store, _router) {
                    var _this = this;
                    this._store = _store;
                    this._router = _router;
                    this.header = '';
                    this.message = 'Please wait while the application is loading...';
                    this.iconClass = 'ko-user-admin';
                    this.initWorkflow = this._store.select('InitWorkflowReducer');
                    this.initWorkflow.subscribe(function (data) {
                        _this.initDone = data.status === "completed";
                        _this.updateHeader();
                    }, function (error) {
                    });
                }
                SpinnerComponent.prototype.ngOnInit = function () {
                    this.updateHeader();
                };
                SpinnerComponent.prototype.updateHeader = function () {
                    //when the workflow is initiating, show hello, otherwise show loading
                    this.header = (this.initDone) ? 'Loading' : 'Hello!';
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], SpinnerComponent.prototype, "header", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], SpinnerComponent.prototype, "message", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], SpinnerComponent.prototype, "iconClass", void 0);
                SpinnerComponent = __decorate([
                    core_1.Component({
                        selector: 'spinner-component',
                        templateUrl: '/src/core/components/spinner/spinner.component.html'
                    }), 
                    __metadata('design:paramtypes', [store_1.Store, router_deprecated_1.Router])
                ], SpinnerComponent);
                return SpinnerComponent;
            }());
            exports_1("SpinnerComponent", SpinnerComponent);
        }
    }
});
//# sourceMappingURL=spinner.component.js.map