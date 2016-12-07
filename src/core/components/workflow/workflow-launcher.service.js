System.register(['@angular/core', '../../services/ssc-workflow-execution.service', './models/workflow-execution', '@ngrx/store', '../../reducers/workflow-context.reducer', '../../reducers/dso-model.reducer'], function(exports_1, context_1) {
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
    var core_1, ssc_workflow_execution_service_1, workflow_execution_1, store_1, workflow_context_reducer_1, dso_model_reducer_1;
    var WorkflowExecutionStatus, WorkflowLauncherService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ssc_workflow_execution_service_1_1) {
                ssc_workflow_execution_service_1 = ssc_workflow_execution_service_1_1;
            },
            function (workflow_execution_1_1) {
                workflow_execution_1 = workflow_execution_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (workflow_context_reducer_1_1) {
                workflow_context_reducer_1 = workflow_context_reducer_1_1;
            },
            function (dso_model_reducer_1_1) {
                dso_model_reducer_1 = dso_model_reducer_1_1;
            }],
        execute: function() {
            (function (WorkflowExecutionStatus) {
                WorkflowExecutionStatus[WorkflowExecutionStatus["NONE"] = -1] = "NONE";
                WorkflowExecutionStatus[WorkflowExecutionStatus["STARTING"] = 0] = "STARTING";
                WorkflowExecutionStatus[WorkflowExecutionStatus["RUNNING"] = 1] = "RUNNING";
                WorkflowExecutionStatus[WorkflowExecutionStatus["TERMINATED"] = 2] = "TERMINATED";
                WorkflowExecutionStatus[WorkflowExecutionStatus["ERROR"] = -2] = "ERROR";
            })(WorkflowExecutionStatus || (WorkflowExecutionStatus = {}));
            exports_1("WorkflowExecutionStatus", WorkflowExecutionStatus);
            WorkflowLauncherService = (function () {
                function WorkflowLauncherService(_wfExecService, _store) {
                    this._wfExecService = _wfExecService;
                    this._store = _store;
                    this.headless = false;
                    this.isDone = new core_1.EventEmitter();
                    this.processBreadCrumbs = new core_1.EventEmitter();
                    this._executionStatus = WorkflowExecutionStatus.NONE;
                    this._wfExec = new workflow_execution_1.WorkflowExecution();
                }
                /**
                 * Subscribes to any event returned by the workflow execution service and
                 * updates the status of this workflow if a matching event is found
                 */
                WorkflowLauncherService.prototype.listenForEvents = function () {
                    var _this = this;
                    var wfExecutions = this._store.select('WorkflowExecutionReducer');
                    wfExecutions.subscribe(function (wfExecs) {
                        if (wfExecs && wfExecs.length > 0) {
                            wfExecs.map(function (wfExec) {
                                if (_this._wfExec.id == wfExec.id) {
                                    _this._wfExec = wfExec;
                                    _this.processBreadCrumbs.emit();
                                    if (!_this._wfExec.step) {
                                        console.log("No Step information found on Workflow response");
                                    }
                                    _this._wfExec.step.content = _this.parseJson(_this._wfExec.step.content);
                                    // Add the data passed by data event to the workflow context
                                    if (_this._wfExec.step.template === 'dataevent') {
                                        var data = _this._wfExec.step.content.data;
                                        if (data && data.modelUpdateEventType) {
                                            _this.processModelUpdateEvent(data);
                                        }
                                        else {
                                            _this._store.dispatch({ type: workflow_context_reducer_1.WF_CTX_ACTION_UPDATE, payload: data });
                                        }
                                        _this.handleSignal({ signalName: 'next', payload: null });
                                    }
                                    if (_this._wfExec.step.done) {
                                        _this._executionStatus = WorkflowExecutionStatus.TERMINATED;
                                        _this.isDone.emit(_this._wfExec.data);
                                    }
                                    _this._executionStatus = WorkflowExecutionStatus.RUNNING;
                                }
                            });
                        }
                    }, function (error) {
                        console.log("Error: " + error);
                    });
                };
                WorkflowLauncherService.prototype.launchWorkflow = function (workflowName, workflowParameters) {
                    this._wfExec.name = workflowName;
                    this.workflowParameters = workflowParameters;
                    this._wfExec.subscriberId = this._store._value.AuthenticationReducer.subscriberId;
                    if (this._store._value.WorkflowContextReducer.globalContext &&
                        this._store._value.WorkflowContextReducer.globalContext.groupDataJSON) {
                        /*order is important, lets overwrite any value on the store from any new value on workflowParameters*/
                        this.workflowParameters = Object.assign({}, this._store._value.WorkflowContextReducer.globalContext.groupDataJSON, this.workflowParameters);
                    }
                    this._wfExec.breadcrumbs = true;
                    this.listenForEvents();
                    this.startWorkflow(this.workflowParameters);
                };
                /**
                 * Launches a new workflow passing the workflowParameters parameter as start parameters.
                 * @param workflowParameters
                 */
                WorkflowLauncherService.prototype.startWorkflow = function (workflowParameters) {
                    var _this = this;
                    this._executionStatus = WorkflowExecutionStatus.STARTING;
                    this._wfExecService.startWorkflow(this._wfExec, workflowParameters).subscribe(function (response) {
                        _this._wfExec.id = response.workflow.id;
                    }, function (error) {
                        console.log("Error while starting workflow: " + error);
                    });
                };
                WorkflowLauncherService.prototype.processModelUpdateEvent = function (data) {
                    var modelUpdateEventType = data.modelUpdateEventType;
                    var modelUpdateEvent = data.modelUpdateEvent;
                    var actionType = null;
                    if (modelUpdateEventType && modelUpdateEvent) {
                        switch (modelUpdateEventType) {
                            case "account":
                                actionType = dso_model_reducer_1.DSO_MODEL_ACTION_ADD_OR_UPDATE_ACCOUNT;
                                break;
                            case "domain":
                                actionType = dso_model_reducer_1.DSO_MODEL_ACTION_ADD_OR_UPDATE_DOMAIN;
                                break;
                            case "service":
                                actionType = dso_model_reducer_1.DSO_MODEL_ACTION_ADD_OR_UPDATE_SERVICE;
                                break;
                            case "operation":
                                actionType = dso_model_reducer_1.DSO_MODEL_ACTION_ADD_OR_UPDATE_OPERATION;
                                break;
                            default:
                                console.log('Unsupported action type: ' + modelUpdateEventType);
                                return;
                        }
                        if (actionType) {
                            this._store.dispatch({ type: actionType, payload: modelUpdateEvent });
                        }
                    }
                };
                /**
                 * Sends a signal and its payload to the workflow engine.
                 * @param signal
                 */
                WorkflowLauncherService.prototype.handleSignal = function (signal) {
                    this._wfExecService.sendSignal(this._wfExec, signal.signalName, signal.payload).subscribe(function (response) {
                        //TODO: This kind of request doesn't provide a response, handle status != 200
                        return;
                    }, function (error) {
                        //TODO: Handle errors
                    });
                };
                /**
                 * Cancel workflow execution
                 */
                WorkflowLauncherService.prototype.cancelWorkflow = function () {
                    console.log("Cancelling workflow execution");
                    this._wfExecService.cancelWorkflow(this._wfExec).subscribe(function (response) {
                        //TODO: This kind of request doesn't provide a response, handle status != 200
                        return;
                    }, function (error) {
                        //TODO: Handle errors
                    });
                };
                /**
                 * Suspend workflow execution
                 */
                WorkflowLauncherService.prototype.suspendWorkflow = function () {
                    console.log("Suspending workflow execution");
                    this._wfExecService.suspendWorkflow(this._wfExec).subscribe(function (response) {
                        //TODO: This kind of request doesn't provide a response, handle status != 200
                        return;
                    }, function (error) {
                        //TODO: Handle errors
                    });
                };
                /**
                 * Parses json data from the workflow response
                 * @param jsonString
                 * @returns {any}
                 */
                WorkflowLauncherService.prototype.parseJson = function (jsonString) {
                    try {
                        var jsonObject = JSON.parse(jsonString);
                        if (jsonObject && jsonObject.data && typeof (jsonObject.data) === 'string') {
                            jsonObject.data = this.parseJson(jsonObject.data);
                        }
                        return jsonObject;
                    }
                    catch (e) {
                        return jsonString;
                    }
                };
                WorkflowLauncherService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [ssc_workflow_execution_service_1.SSCWorkflowExecutionService, store_1.Store])
                ], WorkflowLauncherService);
                return WorkflowLauncherService;
            }());
            exports_1("WorkflowLauncherService", WorkflowLauncherService);
        }
    }
});
//# sourceMappingURL=workflow-launcher.service.js.map