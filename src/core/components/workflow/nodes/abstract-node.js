System.register(['@angular/core', '../models/workflow-execution'], function(exports_1, context_1) {
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
    var core_1, workflow_execution_1;
    var AbstractNode;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (workflow_execution_1_1) {
                workflow_execution_1 = workflow_execution_1_1;
            }],
        execute: function() {
            AbstractNode = (function () {
                function AbstractNode() {
                    this.onSignalEvent = new core_1.EventEmitter();
                    this.onCancelWorkflowEvt = new core_1.EventEmitter();
                    this.onSuspendWorkflowEvt = new core_1.EventEmitter();
                }
                AbstractNode.prototype.sendSignal = function (signalName, payload) {
                    this.onSignalEvent.emit({ signalName: signalName, payload: payload });
                };
                AbstractNode.prototype.ngOnChanges = function (changes) {
                    if (changes['content']) {
                        // On every change of the content input parameter clear the existing data and refresh it if provided
                        this.data = undefined;
                        if (this.content && typeof this.content === 'string') {
                            /*TODO: hot fix to scape '"' on value of formValues element*/
                            this.fixFormValuesContent();
                            this.content = this.parseJson(this.content);
                        }
                        if (this.content && this.content.data) {
                            this.data = this.content.data;
                        }
                    }
                };
                /*TODO: hot fix to scape '"' on value of formValues element*/
                AbstractNode.prototype.fixFormValuesContent = function () {
                    var formValueKeyIdx = this.content.indexOf('"formValues"');
                    var startIdx = this.content.indexOf('{', formValueKeyIdx);
                    var endIdx = this.content.indexOf('}', formValueKeyIdx);
                    var newValue = this.content.substring(startIdx, endIdx + 1).replace(/"/g, '\\"');
                    this.content = this.content.substr(0, startIdx) + newValue + this.content.substr(endIdx + 1);
                };
                /**
                 * Parses json data from the workflow response
                 * @param jsonString
                 * @returns {any}
                 */
                AbstractNode.prototype.parseJson = function (jsonString) {
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
                AbstractNode.prototype.cancelWorkflow = function () {
                    this.onCancelWorkflowEvt.emit(null);
                };
                AbstractNode.prototype.suspendWorkflow = function () {
                    this.onSuspendWorkflowEvt.emit(null);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], AbstractNode.prototype, "content", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', workflow_execution_1.WorkflowStep)
                ], AbstractNode.prototype, "workflowStep", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], AbstractNode.prototype, "onSignalEvent", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], AbstractNode.prototype, "onCancelWorkflowEvt", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], AbstractNode.prototype, "onSuspendWorkflowEvt", void 0);
                return AbstractNode;
            }());
            exports_1("AbstractNode", AbstractNode);
        }
    }
});
//# sourceMappingURL=abstract-node.js.map