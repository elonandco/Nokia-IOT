System.register(['@angular/core', '@angular/router-deprecated', '../datatable/datatable.component', '../workflow/workflow.component', '@ngrx/store'], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, datatable_component_1, workflow_component_1, store_1;
    var pageWrapper;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (datatable_component_1_1) {
                datatable_component_1 = datatable_component_1_1;
            },
            function (workflow_component_1_1) {
                workflow_component_1 = workflow_component_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            }],
        execute: function() {
            pageWrapper = (function () {
                function pageWrapper(_router, _store, data) {
                    var _this = this;
                    this._router = _router;
                    this._store = _store;
                    this.componentType = "";
                    this.workflowOperations = [];
                    this.workflowActive = false;
                    this.campaignActive = false;
                    this.componentActive = false;
                    this.workflowHidden = false;
                    this.title = 'Campaign Details';
                    this.columnsArray = [];
                    this.columnData = [];
                    this.type = data.get('type');
                    this.dsoObs = _store.select('DSOModelReducer');
                    this.workflowConvetextObs = _store.select('WorkflowContextReducer');
                    this.dsoObs.subscribe(function (data) {
                        var services = _.find(data.domains.domain, function (domain) {
                            return domain.id === "Widgets";
                        }).services.service;
                        var campaigns = _.find(services, function (service) {
                            return service.id === "Campaigns";
                        });
                        var operations = _.cloneDeep(campaigns.operations.operation);
                        _this.refreshOperation = _.remove(operations, function (operation) {
                            return operation.attributes.hasOwnProperty('type') && operation.attributes.type === "refresh";
                        })[0];
                        _.remove(operations, function (operation) {
                            return operation.attributes.hasOwnProperty('type') && operation.attributes.type === "refresh_widget";
                        })[0];
                        _this.workflowOperations = operations;
                    }, function (error) {
                    });
                }
                pageWrapper.prototype.ngOnInit = function () {
                    this.workflowName = _.find(this.workflowOperations, function (operation) {
                        return operation.attributes.hasOwnProperty('type') && operation.attributes.type === "details";
                    }).operationName;
                    this.workflowActive = true;
                };
                pageWrapper.prototype.isDone = function (evt) {
                    this.workflowHidden = true;
                    switch (this.type) {
                        case 'Campaigns':
                            {
                                this.workflowActive = false;
                                this.initCampaigns();
                                this.campaignActive = true;
                                this.componentActive = true;
                                this.componentType = 'Campaigns';
                                break;
                            }
                    }
                };
                pageWrapper.prototype.initCampaigns = function () {
                    var _this = this;
                    this.workflowConvetextObs.subscribe(function (data) {
                        _this.columnsArray = [
                            { field: 'name', header: 'Name' },
                            { field: 'type', header: 'Type' },
                            { field: 'creationDate', header: 'Create Date' },
                            { field: 'startDate', header: 'Start Date' },
                            { field: 'endDate', header: 'End Date' },
                            { field: 'finishDate', header: 'Finish Date' },
                            { field: 'devices', header: 'Devices' },
                            { field: 'user', header: 'User' },
                            { field: 'status', header: 'Status' }
                        ];
                        _this.columnData = data.globalContext.campaign_data;
                    }, function (error) {
                    });
                };
                pageWrapper.prototype.onOperationClick = function (evt) {
                    this.hideComponent();
                    this.runWorkflow(evt.target.getAttribute('operation'));
                };
                pageWrapper.prototype.hideComponent = function () {
                    switch (this.type) {
                        case 'Campaigns':
                            {
                                this.campaignActive = false;
                                this.componentActive = false;
                                break;
                            }
                    }
                };
                pageWrapper.prototype.runWorkflow = function (operation) {
                    this.workflowName = operation;
                    this.workflowHidden = false;
                    this.workflowActive = true;
                };
                pageWrapper.prototype.onClose = function (evt) {
                    var link = ['Dashboard'];
                    this._router.navigate(link);
                };
                pageWrapper.prototype.onRefresh = function (evt) {
                    this.hideComponent();
                    this.runWorkflow(this.refreshOperation.operationName);
                };
                pageWrapper = __decorate([
                    core_1.Component({
                        selector: 'campaign-detail',
                        templateUrl: '/src/core/components/pagewrapper/page-wrapper.component.html',
                        directives: [datatable_component_1.Datatable, workflow_component_1.WorkflowComponent]
                    }), 
                    __metadata('design:paramtypes', [router_deprecated_1.Router, store_1.Store, router_deprecated_1.RouteData])
                ], pageWrapper);
                return pageWrapper;
            }());
            exports_1("pageWrapper", pageWrapper);
        }
    }
});
//# sourceMappingURL=page-wrapper.component.js.map