/**
 * Created by jlmayorga on 4/21/16.
 */
System.register(['@angular/core', '@angular/common', './dynamic-form-element.component', './model/form-elements', '@angular/core/src/facade/collection'], function(exports_1, context_1) {
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
    var core_1, common_1, dynamic_form_element_component_1, form_elements_1, collection_1;
    var DynamicFormComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (dynamic_form_element_component_1_1) {
                dynamic_form_element_component_1 = dynamic_form_element_component_1_1;
            },
            function (form_elements_1_1) {
                form_elements_1 = form_elements_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            }],
        execute: function() {
            DynamicFormComponent = (function () {
                function DynamicFormComponent(_fb) {
                    this._fb = _fb;
                    this.content = [];
                    this.data = [];
                    this.handleSubmit = new core_1.EventEmitter();
                    this.handleCancel = new core_1.EventEmitter();
                    this.handleBack = new core_1.EventEmitter();
                    this.handleSuspend = new core_1.EventEmitter();
                    this.formElements = [];
                    this.payLoad = '';
                }
                DynamicFormComponent.prototype.ngOnChanges = function () {
                    this.formElements = this.getFormElements(this.data);
                    this.form = this.toControlGroup(this.formElements);
                };
                DynamicFormComponent.prototype.cancelWorkflow = function () {
                    this.handleCancel.emit();
                };
                DynamicFormComponent.prototype.suspendWorkflow = function () {
                    this.handleSuspend.emit();
                };
                DynamicFormComponent.prototype.handleBack = function () {
                    this.handleBack.emit();
                };
                DynamicFormComponent.prototype.handleReset = function () {
                    this.form['_touched'] = false;
                    collection_1.StringMapWrapper.forEach(this.form.controls, function (control, name) {
                        control['_touched'] = false;
                    });
                };
                DynamicFormComponent.prototype.onSubmit = function () {
                    //adjust the format of the data for radio buttons to match what the workflow is expecting before creating the payload
                    for (var prop in this.form.value) {
                        if (typeof this.form.value[prop] === 'object' && this.form.value[prop].constructor.name === 'RadioButtonState') {
                            if (this.form.value[prop].checked) {
                                this.form.value[this.form.value[prop].value.split('_')[0]] = this.form.value[prop].value.split('_')[1];
                                delete this.form.value[prop];
                            }
                            else {
                                delete this.form.value[prop];
                            }
                        }
                    }
                    this.payLoad = JSON.stringify(this.form.value);
                    this.handleSubmit.emit(this.payLoad);
                };
                /**
                 * Builds a Form ControlGroup based on the Form Elements passed as parameters and adds any validation that is specified in the Form Elements
                 *
                 * @param formElements
                 * @returns {ControlGroup}
                 */
                DynamicFormComponent.prototype.toControlGroup = function (formElements) {
                    var _this = this;
                    var controlGroup = {};
                    var passwordGroup = {};
                    var valueGroup = {};
                    formElements.forEach(function (formElement) {
                        var validations = [];
                        if (formElement.validations) {
                            formElement.validations.map(function (validation) {
                                switch (form_elements_1.FormElementValidationType[validation.type]) {
                                    case form_elements_1.FormElementValidationType.required:
                                        validations.push(common_1.Validators.required);
                                        break;
                                    case form_elements_1.FormElementValidationType.pattern:
                                        validations.push(common_1.Validators.pattern(validation.expression));
                                        break;
                                    case form_elements_1.FormElementValidationType.maxlength:
                                        validations.push(common_1.Validators.maxLength(validation.expression));
                                        break;
                                    case form_elements_1.FormElementValidationType.minlength:
                                        validations.push(common_1.Validators.minLength(validation.expression));
                                        break;
                                }
                            });
                        }
                        controlGroup[formElement.key] = [formElement.value || '', common_1.Validators.compose(validations)];
                        passwordGroup['validator'] = _this.passwordValue('newPasswordID', 'confirmPasswordID');
                        valueGroup['validator'] = _this.matchValue('newSource', 'newTarget');
                    });
                    if (controlGroup.confirmPasswordID && controlGroup.newPasswordID) {
                        return this._fb.group(controlGroup, passwordGroup);
                    }
                    if (controlGroup.newSource && controlGroup.newTarget) {
                        return this._fb.group(controlGroup, valueGroup);
                    }
                    else {
                        return this._fb.group(controlGroup);
                    }
                };
                DynamicFormComponent.prototype.passwordValue = function (passwordKey, passwordConfirmationKey) {
                    return function (group) {
                        var passwordInput = group.controls[passwordKey];
                        var passwordConfirmationInput = group.controls[passwordConfirmationKey];
                        if (passwordInput.value !== passwordConfirmationInput.value) {
                            return passwordConfirmationInput.setErrors({ notEquivalent: true });
                        }
                    };
                };
                DynamicFormComponent.prototype.matchValue = function (valueKey, confirmationKey) {
                    return function (group) {
                        var valueInput = group.controls[valueKey].value.split(" ").join("").toLowerCase();
                        var confirmationInput = group.controls[confirmationKey].value.split(" ").join("").toLowerCase();
                        if (valueInput === confirmationInput) {
                            return group.controls[confirmationKey].setErrors({ notEquivalent: false });
                        }
                    };
                };
                DynamicFormComponent.prototype.updateSubOptions = function (value, options, subControl) {
                    //retrieve all sub options
                    var sub_options = options[_.map(options, 'key').indexOf(value)].subOptions;
                    //out of all the sub options, retrieve the one defined as subOptionKey
                    var new_options = sub_options[_.map(sub_options, 'key').indexOf(subControl.subOptionKey)].options;
                    //apply new options
                    this.data[_.map(this.data, 'key').indexOf(subControl.key)].options = new_options;
                };
                DynamicFormComponent.prototype.updateSubStatus = function (change, subControl) {
                    if (change.target.value.length) {
                        this.data[_.map(this.data, 'key').indexOf(subControl.key)].status = subControl.subStatus;
                    }
                };
                DynamicFormComponent.prototype.findKey = function (target) {
                    var key = "";
                    if (target.classList.contains('hasDatepicker')) {
                        key = target.parentNode.parentNode.id;
                    }
                    else {
                        key = target.id;
                    }
                    return key;
                };
                DynamicFormComponent.prototype.updateHiddenField = function (value, options, subControl) {
                    var ifAddNew = (value === "Add New");
                    var ifFormValid = true;
                    //toggle visibility
                    this.data[_.map(this.data, 'key').indexOf(subControl.key)].id = ifAddNew ? "" : subControl.subHiddenField;
                    //toggle out the value since it may have validations
                    this.form.controls[subControl.key]['_status'] = ifAddNew ? "INVALID" : "VALID";
                    this.form.controls[subControl.key]['_touched'] = !ifAddNew;
                    this.form.controls[subControl.key]['_prestine'] = ifAddNew;
                    //loop through all control types to see if form is valid
                    collection_1.StringMapWrapper.forEach(this.form.controls, function (control, name) {
                        ifFormValid = control['_status'] === "VALID" && ifFormValid;
                    });
                    //set form status since we manually changed the validation on the hidden field
                    this.form['_status'] = ifFormValid ? "VALID" : "INVALID";
                };
                /**
                 * Takes the data passed as input and creates Form Elements
                 * @param data
                 * @returns {Array|Array}
                 */
                DynamicFormComponent.prototype.getFormElements = function (data) {
                    var jsonData = data.sort(function (a, b) { return a.order - b.order; });
                    var formElements = jsonData.map(function (jsonElement) {
                        var formElement = null;
                        if (jsonElement && jsonElement.controlType === 'dropdown') {
                            formElement = jsonElement;
                        }
                        else if (jsonElement && jsonElement.controlType == 'textbox') {
                            formElement = jsonElement;
                        }
                        else if (jsonElement && jsonElement.controlType == 'date') {
                            formElement = jsonElement;
                        }
                        else if (jsonElement && jsonElement.controlType == 'file') {
                            formElement = jsonElement;
                        }
                        else if (jsonElement && jsonElement.controlType === 'radiogroup') {
                            formElement = jsonElement.options.map(function (entry) {
                                return new form_elements_1.RadioFormElement({
                                    groupId: jsonElement.key,
                                    value: { checked: false, value: entry.value },
                                    key: entry.label,
                                    text: entry.text,
                                    checked: entry.checked,
                                    label: entry.label,
                                    order: jsonElement.order || 5000,
                                    controlType: 'radio'
                                });
                            });
                        }
                        else if (jsonElement && jsonElement.controlType === 'checkbox') {
                            formElement = jsonElement;
                        }
                        else if (jsonElement && jsonElement.controlType === 'timeofday') {
                            formElement = jsonElement;
                        }
                        else if (jsonElement && jsonElement.controlType === 'button') {
                            formElement = jsonElement;
                        }
                        else if (jsonElement && jsonElement.controlType === 'textarea') {
                            formElement = jsonElement;
                        }
                        else if (jsonElement && jsonElement.controlType === 'static') {
                            formElement = jsonElement;
                        }
                        return formElement;
                    });
                    //flatten nested arrays into a single dimension array
                    return this.flattenArray(formElements);
                };
                /**
                 * Flattens an array of arrays into a single array
                 *
                 * Example: Array ['1', '2' ,['3','4']] will be flattened to ['1','2','3','4']
                 *
                 * @param array
                 * @returns {Array}
                 */
                DynamicFormComponent.prototype.flattenArray = function (array) {
                    var toString = Object.prototype.toString;
                    var arrayTypeStr = '[object Array]';
                    var result = [];
                    var nodes = array.slice();
                    var node;
                    if (!array.length) {
                        return result;
                    }
                    node = nodes.pop();
                    do {
                        if (toString.call(node) === arrayTypeStr) {
                            nodes.push.apply(nodes, node);
                        }
                        else {
                            result.push(node);
                        }
                    } while (nodes.length && (node = nodes.pop()) !== undefined);
                    result.reverse(); // reverse to restore original order
                    return result;
                };
                DynamicFormComponent.prototype.formChangeEvent = function (change) {
                    //all configurations from dropdown element
                    var config = this.data[_.map(this.data, 'key').indexOf(this.findKey(change.target))];
                    if (change.target.getAttribute('type') === 'file') {
                        var file = change.target.files[0];
                        var formElement = change.target.id;
                        var reader = new FileReader();
                        reader.onload = (function (formElement, formData) {
                            return function (event) {
                                formData.value[formElement] = this.result;
                            };
                        })(formElement, this.form);
                        reader.readAsText(file);
                    }
                    //if its a element with sub control
                    if (config && config.subControl) {
                        //value selected from dropdown
                        var value = change.target.value;
                        //loop through all of the sub controls and apply options
                        for (var i = 0; i < config.subControl.length; i++) {
                            //if subOptionKey is a property, update sub option
                            if (config.subControl[i].subOptionKey) {
                                this.updateSubOptions(value, config.options, config.subControl[i]);
                            }
                            //if subHiddenField is a property, update hidden field
                            if (config.subControl[i].subHiddenField) {
                                this.updateHiddenField(value, change.target.id, config.subControl[i]);
                            }
                            //if subHiddenField is a property, update hidden field
                            if (config.subControl[i].subStatus === "") {
                                this.updateSubStatus(change, config.subControl[i]);
                            }
                        }
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], DynamicFormComponent.prototype, "content", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], DynamicFormComponent.prototype, "data", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], DynamicFormComponent.prototype, "prevStepId", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], DynamicFormComponent.prototype, "handleSubmit", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], DynamicFormComponent.prototype, "handleCancel", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], DynamicFormComponent.prototype, "handleBack", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], DynamicFormComponent.prototype, "handleSuspend", void 0);
                DynamicFormComponent = __decorate([
                    core_1.Component({
                        selector: 'dynamic-form',
                        templateUrl: 'src/core/components/dynamic-form/dynamic-form.component.html',
                        directives: [dynamic_form_element_component_1.DynamicFormElementComponent]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder])
                ], DynamicFormComponent);
                return DynamicFormComponent;
            }());
            exports_1("DynamicFormComponent", DynamicFormComponent);
        }
    }
});
//# sourceMappingURL=dynamic-form.component.js.map