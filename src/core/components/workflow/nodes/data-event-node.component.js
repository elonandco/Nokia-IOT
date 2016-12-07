System.register(['./abstract-node', '@angular/core', '@angular/router-deprecated', '@ngrx/store'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var abstract_node_1, core_1, router_deprecated_1, store_1;
    var DataEventNodeComponent;
    return {
        setters:[
            function (abstract_node_1_1) {
                abstract_node_1 = abstract_node_1_1;
            },
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
            DataEventNodeComponent = (function (_super) {
                __extends(DataEventNodeComponent, _super);
                function DataEventNodeComponent(_store, _router) {
                    var _this = this;
                    this._store = _store;
                    this._router = _router;
                    this.header = '';
                    this.message = 'Just a moment while your preferences are loaded.';
                    this.iconClass = 'ko-user-admin';
                    this._store = _store;
                    this.dsoObs = this._store.select('DSOModelReducer');
                    this.initWorkflow = this._store.select('InitWorkflowReducer');
                    this.dsoObs.subscribe(function (data) {
                        _this.data = data || {};
                        _this.updateHeader();
                    }, function (error) {
                    });
                    this.initWorkflow.subscribe(function (data) {
                        _this.initDone = data.status === "completed";
                        _this.updateHeader();
                    }, function (error) {
                    });
                }
                DataEventNodeComponent.prototype.ngOnInit = function () {
                    this.updateHeader();
                };
                DataEventNodeComponent.prototype.updateHeader = function () {
                    if (!this.initDone && this.data) {
                        this.header = "Hello";
                        if (this.data.hasOwnProperty('firstName')) {
                            this.header += " " + this.data.firstName;
                        }
                        if (this.data.hasOwnProperty('lastName')) {
                            this.header += " " + this.data.lastName;
                        }
                        this.header += "!";
                    }
                    else {
                        this.header = "Loading";
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], DataEventNodeComponent.prototype, "header", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], DataEventNodeComponent.prototype, "message", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], DataEventNodeComponent.prototype, "iconClass", void 0);
                DataEventNodeComponent = __decorate([
                    core_1.Component({
                        selector: 'data-event-node',
                        templateUrl: 'src/core/components/workflow/nodes/data-event-node.component.html'
                    }), 
                    __metadata('design:paramtypes', [store_1.Store, router_deprecated_1.Router])
                ], DataEventNodeComponent);
                return DataEventNodeComponent;
            }(abstract_node_1.AbstractNode));
            exports_1("DataEventNodeComponent", DataEventNodeComponent);
        }
    }
});
//# sourceMappingURL=data-event-node.component.js.map