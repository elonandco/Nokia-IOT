System.register(['@angular/core', '@angular/common', './model/form-elements', 'primeng/primeng', "../tooltip/tooltip.directive", "/src/core/components/dynamic-form/dynamic-form-pipe.component"], function(exports_1, context_1) {
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
    var core_1, common_1, form_elements_1, primeng_1, tooltip_directive_1, dynamic_form_pipe_component_1;
    var DynamicFormElementComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (form_elements_1_1) {
                form_elements_1 = form_elements_1_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
            },
            function (tooltip_directive_1_1) {
                tooltip_directive_1 = tooltip_directive_1_1;
            },
            function (dynamic_form_pipe_component_1_1) {
                dynamic_form_pipe_component_1 = dynamic_form_pipe_component_1_1;
            }],
        execute: function() {
            DynamicFormElementComponent = (function () {
                function DynamicFormElementComponent() {
                }
                Object.defineProperty(DynamicFormElementComponent.prototype, "isValid", {
                    get: function () {
                        return this.form.controls[this.formElement.key].valid || this.form.controls[this.formElement.key].untouched;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DynamicFormElementComponent.prototype, "errorList", {
                    get: function () {
                        var errorList = [];
                        if (!this.form.controls[this.formElement.key].valid && this.form.controls[this.formElement.key].touched) {
                            var errors = this.form.controls[this.formElement.key].errors;
                            var _loop_1 = function(error) {
                                if (errors.hasOwnProperty(error)) {
                                    this_1.formElement.validations.forEach(function (validation) {
                                        if (validation.type == error) {
                                            errorList.push(validation.errorMessage);
                                        }
                                    });
                                }
                            };
                            var this_1 = this;
                            for (var error in errors) {
                                _loop_1(error);
                            }
                        }
                        return errorList;
                    },
                    enumerable: true,
                    configurable: true
                });
                DynamicFormElementComponent.prototype.ifRequired = function (validations) {
                    var i = 0;
                    var isRequired = false;
                    if (validations) {
                        for (i; i < validations.length; i++) {
                            if (validations[i]["type"] === "required") {
                                isRequired = true;
                                break;
                            }
                        }
                    }
                    return isRequired;
                };
                DynamicFormElementComponent.prototype.findKey = function (target) {
                    var key = "";
                    if (target.classList.contains('hasDatepicker')) {
                        key = target.parentNode.parentNode.id;
                    }
                    else {
                        key = target.id;
                    }
                    return key;
                };
                DynamicFormElementComponent.prototype.handleFormButton = function (event) {
                    console.log(event);
                };
                DynamicFormElementComponent.prototype.updateSubStatus = function (change) {
                    var subControl = this.data[_.map(this.data, 'key').indexOf(this.findKey(change.target))].subControl;
                    if (change.value.length) {
                        this.data[_.map(this.data, 'key').indexOf(subControl.key)].status = subControl.subStatus;
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', form_elements_1.BaseFormElement)
                ], DynamicFormElementComponent.prototype, "formElement", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', common_1.ControlGroup)
                ], DynamicFormElementComponent.prototype, "form", void 0);
                DynamicFormElementComponent = __decorate([
                    core_1.Component({
                        selector: 'df-element',
                        pipes: [dynamic_form_pipe_component_1.SearchPipe],
                        templateUrl: '/src/core/components/dynamic-form/dynamic-form-element.component.html',
                        directives: [primeng_1.Calendar, tooltip_directive_1.TooltipDirective]
                    }), 
                    __metadata('design:paramtypes', [])
                ], DynamicFormElementComponent);
                return DynamicFormElementComponent;
            }());
            exports_1("DynamicFormElementComponent", DynamicFormElementComponent);
        }
    }
});
//# sourceMappingURL=dynamic-form-element.component.js.map