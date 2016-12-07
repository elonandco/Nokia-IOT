/**
 * Created by jlmayorga on 3/22/16.
 */
System.register(['@angular/core', '../workflow/workflow.component', '../../services/app-configuration.service', '@ngrx/store', '../../reducers/init-workflow.reducer', '../../services/ssc-workflow-execution.service', '../../services/authentication.service', '@angular/router-deprecated'], function(exports_1, context_1) {
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
    var core_1, workflow_component_1, app_configuration_service_1, store_1, init_workflow_reducer_1, ssc_workflow_execution_service_1, authentication_service_1, router_deprecated_1;
    var InitComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (workflow_component_1_1) {
                workflow_component_1 = workflow_component_1_1;
            },
            function (app_configuration_service_1_1) {
                app_configuration_service_1 = app_configuration_service_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (init_workflow_reducer_1_1) {
                init_workflow_reducer_1 = init_workflow_reducer_1_1;
            },
            function (ssc_workflow_execution_service_1_1) {
                ssc_workflow_execution_service_1 = ssc_workflow_execution_service_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            }],
        execute: function() {
            InitComponent = (function () {
                function InitComponent(_configService, _wfExecSvc, _store, _authService, _router) {
                    this._configService = _configService;
                    this._store = _store;
                    this._authService = _authService;
                    this._router = _router;
                    this.initDone = false;
                    this.initCompEmiter = new core_1.EventEmitter();
                    this.initWorkflowName = _configService.getInitWorkflow();
                    this._store.dispatch({ type: init_workflow_reducer_1.INIT_WF_STARTING, payload: { status: 'starting' } });
                    this.groupInfo = this._store.value.GroupContextReducer;
                    //TODO: we need to get the groupInfo from DashboardReducer and identify 
                    //which fire the action to select the correct on, sprint 7
                    //this.beginFlowMode = this._store.value.DashboardReducer;
                    /*TODO: improve where action is firing this workflow
                     * 1) can be from login
                     * 2) can be from dashboard master refresh
                     * 3) can be from dashboard groupTree refresh
                     */
                    if (this.groupInfo != undefined && this.groupInfo != "") {
                        this.workflowParameters = this.groupInfo;
                    }
                    else {
                        this.workflowParameters = this._store.value.AuthenticationReducer.attributes;
                    }
                }
                InitComponent.prototype.ngOnInit = function () {
                    this.initDone = true;
                    return undefined;
                };
                InitComponent.prototype.isDone = function (done) {
                    //TODO: get status from store
                    this.status = this._store.value.WorkflowContextReducer.globalContext["groupTreeStatus"];
                    this.message = this._store.value.WorkflowContextReducer.globalContext["groupTreeMessage"];
                    if (this.status && (this.status == "FAIL" || this.status == "RESTART_NEEDED")) {
                        this.onLogout();
                    }
                    //required for init workflow
                    this.initCompEmiter.emit(true);
                    this._store.dispatch({ type: init_workflow_reducer_1.INIT_WF_COMPLETED, payload: { status: 'completed' } });
                };
                InitComponent.prototype.onLogout = function () {
                    var _this = this;
                    this._authService.logout()
                        .subscribe(function () {
                        _this._router.navigate(['Login']);
                        //window.location.replace('/login')
                    });
                };
                InitComponent.prototype.onClose = function (event) {
                    this.onLogout();
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], InitComponent.prototype, "initCompEmiter", void 0);
                InitComponent = __decorate([
                    core_1.Component({
                        selector: 'app-init-component',
                        templateUrl: '/src/core/components/init/init.component.html',
                        directives: [workflow_component_1.WorkflowComponent],
                        styles: ["\n    .init-panel{\n      margin:0px;\n      padding:0px;\n    }\n  "]
                    }), 
                    __metadata('design:paramtypes', [app_configuration_service_1.AppConfigurationService, ssc_workflow_execution_service_1.SSCWorkflowExecutionService, store_1.Store, authentication_service_1.AuthenticationService, router_deprecated_1.Router])
                ], InitComponent);
                return InitComponent;
            }());
            exports_1("InitComponent", InitComponent);
        }
    }
});
//# sourceMappingURL=init.component.js.map