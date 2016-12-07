System.register(['@angular/core', '@angular/router-deprecated', './nodes/form-node.component', './nodes/prompt-node.component', './nodes/selector-node.component', './nodes/wait-node.component', './nodes/menu-node.component', './nodes/info-node.component', '../../../core/services/authentication.service', '@angular/common', './nodes/question-node.component', '../../services/ssc-workflow-execution.service', './models/workflow-execution', './nodes/multiinput-node.component', './nodes/data-event-node.component', '@ngrx/store', '../spinner/spinner.component', '../../reducers/workflow-context.reducer', '../../reducers/dso-model.reducer', '../../services/app-configuration.service'], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, form_node_component_1, prompt_node_component_1, selector_node_component_1, wait_node_component_1, menu_node_component_1, info_node_component_1, authentication_service_1, common_1, question_node_component_1, ssc_workflow_execution_service_1, workflow_execution_1, multiinput_node_component_1, data_event_node_component_1, store_1, spinner_component_1, workflow_context_reducer_1, dso_model_reducer_1, app_configuration_service_1;
    var WorkflowExecutionStatus, WorkflowComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (form_node_component_1_1) {
                form_node_component_1 = form_node_component_1_1;
            },
            function (prompt_node_component_1_1) {
                prompt_node_component_1 = prompt_node_component_1_1;
            },
            function (selector_node_component_1_1) {
                selector_node_component_1 = selector_node_component_1_1;
            },
            function (wait_node_component_1_1) {
                wait_node_component_1 = wait_node_component_1_1;
            },
            function (menu_node_component_1_1) {
                menu_node_component_1 = menu_node_component_1_1;
            },
            function (info_node_component_1_1) {
                info_node_component_1 = info_node_component_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (question_node_component_1_1) {
                question_node_component_1 = question_node_component_1_1;
            },
            function (ssc_workflow_execution_service_1_1) {
                ssc_workflow_execution_service_1 = ssc_workflow_execution_service_1_1;
            },
            function (workflow_execution_1_1) {
                workflow_execution_1 = workflow_execution_1_1;
            },
            function (multiinput_node_component_1_1) {
                multiinput_node_component_1 = multiinput_node_component_1_1;
            },
            function (data_event_node_component_1_1) {
                data_event_node_component_1 = data_event_node_component_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (spinner_component_1_1) {
                spinner_component_1 = spinner_component_1_1;
            },
            function (workflow_context_reducer_1_1) {
                workflow_context_reducer_1 = workflow_context_reducer_1_1;
            },
            function (dso_model_reducer_1_1) {
                dso_model_reducer_1 = dso_model_reducer_1_1;
            },
            function (app_configuration_service_1_1) {
                app_configuration_service_1 = app_configuration_service_1_1;
            }],
        execute: function() {
            (function (WorkflowExecutionStatus) {
                WorkflowExecutionStatus[WorkflowExecutionStatus["STARTING"] = 0] = "STARTING";
                WorkflowExecutionStatus[WorkflowExecutionStatus["RUNNING"] = 1] = "RUNNING";
                WorkflowExecutionStatus[WorkflowExecutionStatus["TERMINATED"] = 2] = "TERMINATED";
                WorkflowExecutionStatus[WorkflowExecutionStatus["ERROR"] = -2] = "ERROR";
            })(WorkflowExecutionStatus || (WorkflowExecutionStatus = {}));
            exports_1("WorkflowExecutionStatus", WorkflowExecutionStatus);
            WorkflowComponent = (function () {
                function WorkflowComponent(_wfExecService, _cfgService, _store, _authService, _router) {
                    this._wfExecService = _wfExecService;
                    this._cfgService = _cfgService;
                    this._store = _store;
                    this._authService = _authService;
                    this._router = _router;
                    this.headless = false;
                    this.isDone = new core_1.EventEmitter();
                    this.breadcrumbs = [];
                    this._executionStautsEnum = WorkflowExecutionStatus;
                    this._breadcrumbIgnoredNodes = [];
                    this._breadcrumbEnable = true;
                    this._store = _store;
                    this._executionStatus = WorkflowExecutionStatus.STARTING;
                }
                WorkflowComponent.prototype.ngOnInit = function () {
                    this._wfExec = new workflow_execution_1.WorkflowExecution();
                    this._wfExec.name = this.workflowName;
                    this._wfExec.subscriberId = this._store._value.AuthenticationReducer.subscriberId;
                    if (this._store._value.WorkflowContextReducer.globalContext &&
                        this._store._value.WorkflowContextReducer.globalContext.groupDataJSON) {
                        /*order is important, lets overwrite any value on the store from any new value on workflowParameters*/
                        this.workflowParameters = Object.assign({}, this._store._value.WorkflowContextReducer.globalContext.groupDataJSON, this.workflowParameters);
                    }
                    this._wfExec.breadcrumbs = true;
                    this.listenForEvents();
                    this.startWorkflow(this.workflowParameters);
                    this._breadcrumbIgnoredNodes = this._cfgService.getBreadcrumbIgnoredNodes();
                };
                WorkflowComponent.prototype.ngOnDestroy = function () {
                    this._executionStatus = WorkflowExecutionStatus.TERMINATED;
                };
                /**
                 * Subscribes to any event returned by the workflow execution service and
                 * updates the status of this workflow if a matching event is found
                 */
                WorkflowComponent.prototype.listenForEvents = function () {
                    var _this = this;
                    var wfExecutions = this._store.select('WorkflowExecutionReducer');
                    var workflowConvetextObs = this._store.select('WorkflowContextReducer');
                    wfExecutions.subscribe(function (wfExecs) {
                        if (wfExecs && wfExecs.length > 0) {
                            wfExecs.map(function (wfExec) {
                                if (_this._wfExec.id == wfExec.id) {
                                    _this._wfExec = wfExec;
                                    if (!_this._wfExec.step) {
                                        console.log("No Step information found on Workflow response");
                                    }
                                    _this._wfExec.step.content = _this.parseJson(_this._wfExec.step.content);
                                    _this.processBreadCrumbs();
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
                                        _this.isDone.emit(true);
                                    }
                                    _this._executionStatus = WorkflowExecutionStatus.RUNNING;
                                }
                            });
                        }
                    }, function (error) {
                        console.log("Error: " + error);
                    });
                    workflowConvetextObs.subscribe(function (data) {
                        _this.action_required = data.globalContext.initActionRequired;
                        _this.resetStatus = data.globalContext.resetPasswordStatus;
                        if (_this.resetStatus === "SUCCESS" && _this.action_required === "relogin") {
                            _this.logout();
                        }
                    }, function (error) {
                    });
                };
                WorkflowComponent.prototype.logout = function () {
                    this._authService.logout();
                    this._router.navigate(['Login']);
                };
                WorkflowComponent.prototype.processModelUpdateEvent = function (data) {
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
                 * Builds the breadcrumb array for each step, appending the current step to the end of the array.
                 */
                WorkflowComponent.prototype.processBreadCrumbs = function () {
                    if (this._wfExec.step) {
                        /*
                         if (this._wfExec.step.breadcrumbs) {
                         this.breadcrumbs = this._wfExec.step.breadcrumbs.map((breadcrumb)=> {
                         if (breadcrumb) {
                         return {name: breadcrumb.displayName, stepId: breadcrumb.id};
                         }
                         });
                         }
                         */
                        var lastBreadcrumb = this.breadcrumbs[this.breadcrumbs.length - 1];
                        if (this._breadcrumbIgnoredNodes.indexOf(this._wfExec.step.template) < 0) {
                            //is this the same last step
                            var notPrevBreadcrumb = (lastBreadcrumb) ? lastBreadcrumb.name !== this._wfExec.step.displayName : true;
                            if (notPrevBreadcrumb) {
                                this.breadcrumbs.push({ name: this._wfExec.step.displayName, stepId: this._wfExec.step.id });
                            }
                            /*Let si if there is a flag to disabled the breadcrumb*/
                            if (this._wfExec.step.content.data && this._wfExec.step.content.data.breadcrumbStatus == "disabled") {
                                this._breadcrumbEnable = false;
                            }
                        }
                    }
                };
                /**
                 * Launches a new workflow passing the workflowParameters parameter as start parameters.
                 * @param workflowParameters
                 */
                WorkflowComponent.prototype.startWorkflow = function (workflowParameters) {
                    var _this = this;
                    this._wfExecService.startWorkflow(this._wfExec, workflowParameters).subscribe(function (response) {
                        _this._wfExec.id = response.workflow.id;
                    }, function (error) {
                        console.log("Error while starting workflow: " + error);
                    });
                };
                /**
                 * Handles clicks for breadcrumb element
                 * @param stepId
                 */
                WorkflowComponent.prototype.gotoStep = function (stepId) {
                    if (!this._breadcrumbEnable) {
                        return;
                    }
                    var index = this.breadcrumbs.findIndex(function (element, index, array) {
                        return element.stepId === stepId;
                    });
                    this.breadcrumbs.splice(index);
                    this.handleSignal({
                        signalName: 'goToStep', payload: {
                            targetStepID: stepId,
                            signalValue: "goToStep"
                        }
                    });
                };
                /**
                 * Sends a signal and its payload to the workflow engine.
                 * @param signal
                 */
                WorkflowComponent.prototype.handleSignal = function (signal) {
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
                WorkflowComponent.prototype.cancelWorkflow = function () {
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
                WorkflowComponent.prototype.suspendWorkflow = function () {
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
                WorkflowComponent.prototype.parseJson = function (jsonString) {
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
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], WorkflowComponent.prototype, "workflowName", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], WorkflowComponent.prototype, "workflowParameters", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], WorkflowComponent.prototype, "headless", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], WorkflowComponent.prototype, "isDone", void 0);
                WorkflowComponent = __decorate([
                    core_1.Component({
                        selector: 'workflow-component',
                        templateUrl: '/src/core/components/workflow/workflow.component.html',
                        directives: [common_1.NgClass,
                            multiinput_node_component_1.MultiinputNodeComponent,
                            form_node_component_1.FormNodeComponent,
                            info_node_component_1.InfoNodeComponent,
                            menu_node_component_1.MenuNodeComponent,
                            prompt_node_component_1.PromptNodeComponent,
                            selector_node_component_1.SelectorNodeComponent,
                            wait_node_component_1.WaitNodeComponent,
                            question_node_component_1.QuestionNodeComponent,
                            data_event_node_component_1.DataEventNodeComponent,
                            spinner_component_1.SpinnerComponent],
                    }), 
                    __metadata('design:paramtypes', [ssc_workflow_execution_service_1.SSCWorkflowExecutionService, app_configuration_service_1.AppConfigurationService, store_1.Store, authentication_service_1.AuthenticationService, router_deprecated_1.Router])
                ], WorkflowComponent);
                return WorkflowComponent;
            }());
            exports_1("WorkflowComponent", WorkflowComponent);
        }
    }
});
//# sourceMappingURL=workflow.component.js.map