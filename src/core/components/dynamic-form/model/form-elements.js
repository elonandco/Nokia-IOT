/**
 * Created by jlmayorga on 4/21/16.
 */
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var FormElementValidationType, FormElementValidation, BaseFormElement, StaticFormElement, TextFormElement, ButtonFormElement, TimeOfDayFormElement, DateFormElement, FileFormElement, TextAreaFormElement, SelectFormElement, RadioFormElement, CheckBoxFormElement;
    return {
        setters:[],
        execute: function() {
            (function (FormElementValidationType) {
                FormElementValidationType[FormElementValidationType["required"] = 0] = "required";
                FormElementValidationType[FormElementValidationType["pattern"] = 1] = "pattern";
                FormElementValidationType[FormElementValidationType["minlength"] = 2] = "minlength";
                FormElementValidationType[FormElementValidationType["maxlength"] = 3] = "maxlength";
            })(FormElementValidationType || (FormElementValidationType = {}));
            exports_1("FormElementValidationType", FormElementValidationType);
            FormElementValidation = (function () {
                function FormElementValidation() {
                }
                return FormElementValidation;
            }());
            exports_1("FormElementValidation", FormElementValidation);
            BaseFormElement = (function () {
                function BaseFormElement(options) {
                    if (options === void 0) { options = {}; }
                    this.value = options.value;
                    this.key = options.key || '';
                    this.label = options.label || '';
                    this.placeholder = options.placeholder || '';
                    this.id = options.id || '';
                    this.text = options.text || '';
                    this.checked = options.checked || '';
                    this.tooltip = options.tooltip || '';
                    this.class = options.class || '';
                    this.required = !!options.required;
                    this.order = options.order === undefined ? 1 : options.order;
                    this.controlType = options.controlType || '';
                    this.validationExpression = options.validationExpression;
                }
                return BaseFormElement;
            }());
            exports_1("BaseFormElement", BaseFormElement);
            StaticFormElement = (function (_super) {
                __extends(StaticFormElement, _super);
                function StaticFormElement() {
                    _super.apply(this, arguments);
                }
                return StaticFormElement;
            }(BaseFormElement));
            exports_1("StaticFormElement", StaticFormElement);
            TextFormElement = (function (_super) {
                __extends(TextFormElement, _super);
                function TextFormElement(options) {
                    if (options === void 0) { options = {}; }
                    _super.call(this, options);
                    this.controlType = 'textbox';
                    this.type = options['type'] || '';
                }
                return TextFormElement;
            }(BaseFormElement));
            exports_1("TextFormElement", TextFormElement);
            ButtonFormElement = (function (_super) {
                __extends(ButtonFormElement, _super);
                function ButtonFormElement(options) {
                    if (options === void 0) { options = {}; }
                    _super.call(this, options);
                    this.controlType = 'button';
                }
                return ButtonFormElement;
            }(BaseFormElement));
            exports_1("ButtonFormElement", ButtonFormElement);
            TimeOfDayFormElement = (function (_super) {
                __extends(TimeOfDayFormElement, _super);
                function TimeOfDayFormElement(options) {
                    if (options === void 0) { options = {}; }
                    _super.call(this, options);
                    this.controlType = 'timeofday';
                }
                return TimeOfDayFormElement;
            }(BaseFormElement));
            exports_1("TimeOfDayFormElement", TimeOfDayFormElement);
            DateFormElement = (function (_super) {
                __extends(DateFormElement, _super);
                function DateFormElement(options) {
                    if (options === void 0) { options = {}; }
                    _super.call(this, options);
                    this.controlType = 'date';
                    this.type = options['type'] || '';
                }
                return DateFormElement;
            }(BaseFormElement));
            exports_1("DateFormElement", DateFormElement);
            FileFormElement = (function (_super) {
                __extends(FileFormElement, _super);
                function FileFormElement(options) {
                    if (options === void 0) { options = {}; }
                    _super.call(this, options);
                    this.controlType = 'file';
                    this.type = options['type'] || '';
                }
                return FileFormElement;
            }(BaseFormElement));
            exports_1("FileFormElement", FileFormElement);
            TextAreaFormElement = (function (_super) {
                __extends(TextAreaFormElement, _super);
                function TextAreaFormElement(options) {
                    if (options === void 0) { options = {}; }
                    _super.call(this, options);
                }
                return TextAreaFormElement;
            }(BaseFormElement));
            exports_1("TextAreaFormElement", TextAreaFormElement);
            SelectFormElement = (function (_super) {
                __extends(SelectFormElement, _super);
                function SelectFormElement(options) {
                    if (options === void 0) { options = {}; }
                    _super.call(this, options);
                    this.controlType = 'dropdown';
                    this.options = [];
                    this.options = options['options'] || [];
                }
                return SelectFormElement;
            }(BaseFormElement));
            exports_1("SelectFormElement", SelectFormElement);
            RadioFormElement = (function (_super) {
                __extends(RadioFormElement, _super);
                function RadioFormElement(options) {
                    if (options === void 0) { options = {}; }
                    _super.call(this, options);
                    this.controlType = 'radio';
                    this.groupId = '';
                    this.groupId = options['groupId'] || '';
                }
                return RadioFormElement;
            }(BaseFormElement));
            exports_1("RadioFormElement", RadioFormElement);
            CheckBoxFormElement = (function (_super) {
                __extends(CheckBoxFormElement, _super);
                function CheckBoxFormElement(options) {
                    if (options === void 0) { options = {}; }
                    _super.call(this, options);
                    this.controlType = 'checkbox';
                }
                return CheckBoxFormElement;
            }(BaseFormElement));
            exports_1("CheckBoxFormElement", CheckBoxFormElement);
        }
    }
});
//# sourceMappingURL=form-elements.js.map