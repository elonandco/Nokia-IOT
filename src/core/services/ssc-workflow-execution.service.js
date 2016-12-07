System.register(['@angular/core', '@angular/http', './app-configuration.service', 'rxjs/Observable', '../components/workflow/models/workflow-execution', '@ngrx/store', '../reducers/dso-model.reducer', '../reducers/workflow-execution.reducer', '@angular/router-deprecated', '../reducers/authentication.reducer'], function(exports_1, context_1) {
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
    var core_1, http_1, app_configuration_service_1, Observable_1, workflow_execution_1, store_1, dso_model_reducer_1, workflow_execution_reducer_1, router_deprecated_1, authentication_reducer_1;
    var SSCWorkflowExecutionService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (app_configuration_service_1_1) {
                app_configuration_service_1 = app_configuration_service_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (workflow_execution_1_1) {
                workflow_execution_1 = workflow_execution_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (dso_model_reducer_1_1) {
                dso_model_reducer_1 = dso_model_reducer_1_1;
            },
            function (workflow_execution_reducer_1_1) {
                workflow_execution_reducer_1 = workflow_execution_reducer_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (authentication_reducer_1_1) {
                authentication_reducer_1 = authentication_reducer_1_1;
            }],
        execute: function() {
            SSCWorkflowExecutionService = (function () {
                function SSCWorkflowExecutionService(_http, _cfgService, _store, _router) {
                    var _this = this;
                    this._http = _http;
                    this._cfgService = _cfgService;
                    this._store = _store;
                    this._router = _router;
                    this.options = new http_1.RequestOptions({
                        headers: new http_1.Headers({
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        })
                    });
                    this.getOptions = new http_1.RequestOptions({
                        headers: new http_1.Headers({
                            'Accept': 'application/json'
                        })
                    });
                    this._store = _store;
                    this._store.select('AuthenticationReducer').subscribe(function (data) {
                        if (data.sessionId) {
                            _this.getEvents();
                        }
                    }, function (error) {
                    });
                }
                /**
                 * Retrieves events from the SSC Rest API
                 * @returns {ConnectableObservable<any>}
                 */
                SSCWorkflowExecutionService.prototype.getEvents = function () {
                    var _this = this;
                    Observable_1.Observable.interval(this._cfgService.getPollingInterval()).switchMap(function () { return _this._http.get(_this._cfgService.getServerUrl() + "/ssc/1.0/events?id=" + _this._store._value.AuthenticationReducer.sessionId, _this.getOptions); })
                        .map(function (res) {
                        if (res.status === 200) {
                            var response = res.json();
                            for (var _i = 0, _a = response.events.event; _i < _a.length; _i++) {
                                var sscEvent = _a[_i];
                                if (sscEvent.type == 'model update') {
                                    var dsoModel = sscEvent.data;
                                    if (dsoModel) {
                                        _this._store.dispatch({ type: dso_model_reducer_1.DSO_MODEL_ACTION_UPDATE, payload: dsoModel });
                                    }
                                }
                                else if (sscEvent.type == 'execution update') {
                                    var regexMatch = sscEvent.href.match(/\/workflows\/(.+)/i);
                                    if (regexMatch && regexMatch.length === 2) {
                                        var eventData = sscEvent.data;
                                        if (eventData) {
                                            var wfExec = eventData;
                                            _this._store.dispatch({ type: workflow_execution_reducer_1.WF_EXEC_ACTION_ADD_OR_UPDATE, payload: wfExec });
                                        }
                                    }
                                }
                                else if (sscEvent.type == 'execution complete') {
                                    var regexMatch = sscEvent.href.match(/\/workflows\/(.+)/i);
                                    if (regexMatch && regexMatch.length === 2) {
                                        var payload = { id: regexMatch[1] };
                                        _this._store.dispatch({ type: workflow_execution_reducer_1.WF_EXEC_COMPLETE, payload: payload });
                                    }
                                }
                            }
                            return res.json();
                        }
                        else {
                        }
                    }).subscribe(function () {
                    }, function (error) {
                        var responseStatus = error.status;
                        if (responseStatus == 401) {
                            //Session expired
                            _this._store.dispatch({ type: "@@ngrx/INIT" });
                            _this._store.dispatch({ type: authentication_reducer_1.LOGOUT });
                            var link = ['Login'];
                            _this._router.navigate(link);
                        }
                    });
                };
                SSCWorkflowExecutionService.prototype.getSuspendedWorkflows = function () {
                };
                /**
                 * Invokes the SSC Rest API to start a workflow execution
                 * @param wfExec
                 * @param payload
                 * @returns {Observable<R>}
                 */
                SSCWorkflowExecutionService.prototype.startWorkflow = function (wfExec, payload) {
                    var request = this.getStartWorkflowRequest(wfExec, payload);
                    return this._http.post(this._cfgService.getServerUrl() + "/ssc/1.0/workflows", request, this.options).map(function (res) { return res.json(); });
                };
                /**
                 * Sends a workflow signal to the SSC Rest API
                 * @param wfExec
                 * @param signalName
                 * @param payload
                 * @returns {Observable<R>}
                 */
                SSCWorkflowExecutionService.prototype.sendSignal = function (wfExec, signalName, payload) {
                    var request = this.getStepRequest(wfExec, signalName, payload);
                    return this._http.put(this._cfgService.getServerUrl() + "/ssc/1.0/workflows/" + wfExec.id, request, this.options).map(function (res) { return res.json(); });
                };
                SSCWorkflowExecutionService.prototype.cancelWorkflow = function (wfExec) {
                    var request = this.getCancelRequest(wfExec);
                    return this._http.put(this._cfgService.getServerUrl() + "/ssc/1.0/workflows/" + wfExec.id, request, this.options).map(function (res) { return res.json(); });
                };
                SSCWorkflowExecutionService.prototype.suspendWorkflow = function (wfExec) {
                    var request = this.getSuspendRequest(wfExec);
                    return this._http.put(this._cfgService.getServerUrl() + "/ssc/1.0/workflows/" + wfExec.id, request, this.options).map(function (res) { return res.json(); });
                };
                /**
                 * Builds the start workflow request for the SSC Rest API
                 * @param wfExec WorkflowExecution object
                 * @param payload payload to be inserted into the workflow dictionary
                 * @returns {string}
                 */
                SSCWorkflowExecutionService.prototype.getStartWorkflowRequest = function (wfExec, payload) {
                    if (payload) {
                        wfExec.data = payload;
                    }
                    return JSON.stringify({ workflow: wfExec });
                };
                /**
                 * Builds the Step request for the SSC Rest API
                 * @param wfExec Workflow Execution object
                 * @param signal Signal to be sent to the workflow engine
                 * @param payload payload to be inserted into the workflow dictionary
                 * @returns {string}
                 */
                SSCWorkflowExecutionService.prototype.getStepRequest = function (wfExec, signal, payload) {
                    var clonedWfExecution = JSON.parse(JSON.stringify(wfExec));
                    var wfSignal = new workflow_execution_1.WorkflowSignal();
                    wfSignal.name = signal;
                    wfSignal.stepId = wfExec.step.id;
                    wfSignal.data = payload ? payload : {};
                    clonedWfExecution.signal = wfSignal;
                    clonedWfExecution.step = null;
                    clonedWfExecution.event = null;
                    return JSON.stringify({ workflow: clonedWfExecution });
                };
                SSCWorkflowExecutionService.prototype.getCancelRequest = function (wfExec) {
                    var clonedWfExecution = JSON.parse(JSON.stringify(wfExec));
                    clonedWfExecution.signal = null;
                    clonedWfExecution.step = null;
                    clonedWfExecution.event = { name: 'cancel', data: {} };
                    return JSON.stringify({ workflow: clonedWfExecution });
                };
                SSCWorkflowExecutionService.prototype.getSuspendRequest = function (wfExec) {
                    var clonedWfExecution = JSON.parse(JSON.stringify(wfExec));
                    clonedWfExecution.signal = null;
                    clonedWfExecution.step = null;
                    clonedWfExecution.event = { name: 'suspend', data: {} };
                    return JSON.stringify({ workflow: clonedWfExecution });
                };
                SSCWorkflowExecutionService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, app_configuration_service_1.AppConfigurationService, store_1.Store, router_deprecated_1.Router])
                ], SSCWorkflowExecutionService);
                return SSCWorkflowExecutionService;
            }());
            exports_1("SSCWorkflowExecutionService", SSCWorkflowExecutionService);
        }
    }
});
//# sourceMappingURL=ssc-workflow-execution.service.js.map