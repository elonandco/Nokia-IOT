System.register(['@angular/core', './abstract-node', '../../dynamic-form/dynamic-form.component', '../../tree/tree-container.component'], function(exports_1, context_1) {
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
    var core_1, abstract_node_1, dynamic_form_component_1, tree_container_component_1;
    var FormNodeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (abstract_node_1_1) {
                abstract_node_1 = abstract_node_1_1;
            },
            function (dynamic_form_component_1_1) {
                dynamic_form_component_1 = dynamic_form_component_1_1;
            },
            function (tree_container_component_1_1) {
                tree_container_component_1 = tree_container_component_1_1;
            }],
        execute: function() {
            FormNodeComponent = (function (_super) {
                __extends(FormNodeComponent, _super);
                function FormNodeComponent() {
                    _super.apply(this, arguments);
                    this.enableButtons = false;
                    this.enableNext = false;
                }
                FormNodeComponent.prototype.ngOnChanges = function (changes) {
                    _super.prototype.ngOnChanges.call(this, changes);
                    this.enableButtons = false;
                    this.formValues = undefined;
                    if (this.content && this.content.data) {
                        this.implementationType = this.content.data.type;
                        if (this.implementationType === 'tree') {
                            this.enableButtons = true;
                        }
                        this.formName = this.content.formName;
                        this.nodeData = this.data.data;
                        if (_.map(this.nodeData, 'key').indexOf('timeZoneID') > -1) {
                            this.nodeData[_.map(this.nodeData, 'key').indexOf('timeZoneID')].options = this.getTimeZoneList();
                        }
                        if (_.map(this.nodeData, 'key').indexOf('policyDateTimeID') > -1) {
                            var options = this.nodeData[_.map(this.nodeData, 'key').indexOf('policyDateTimeID')].options;
                            if (options) {
                                for (var i = 0; i < options.length; i++) {
                                    options[i].value = this.getDuration(options[i].key);
                                }
                            }
                        }
                        if (_.map(this.nodeData, 'key').indexOf('timezone') > -1) {
                            var timezoneObj = this.nodeData[_.map(this.nodeData, 'key').indexOf('timezone')];
                            var timezones = this.getTimeZoneList();
                            timezoneObj.value = timezones[_.map(timezones, 'key').indexOf(timezoneObj.value)].value || "";
                        }
                        if (this.implementationType !== 'form' && this.implementationType !== 'tree') {
                            this.implementationType = 'not_supported';
                        }
                    }
                    else {
                        this.implementationType = 'error';
                    }
                };
                FormNodeComponent.prototype.handleSubmit = function (formValues) {
                    this.formValues = formValues;
                    if (this.implementationType === 'tree') {
                        this.enableNext = true;
                    }
                    else {
                        this.sendSignal('next');
                    }
                };
                FormNodeComponent.prototype.handleBack = function () {
                    this.sendSignal('back');
                };
                FormNodeComponent.prototype.getDuration = function (time) {
                    if (time) {
                        var times = time.split(","), dayofWeek = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
                        amorpm = function (time) {
                            return (time.indexOf("PM") > -1) ? "PM" : "AM";
                        };
                        for (var i = 0; i < times.length; i++) {
                            var timeanddate = times[i].split('#'), duration = timeanddate[0].split('-'), date = new Date(timeanddate[1]), startTime = duration[0], endTime = duration[1];
                            finalTime = startTime.split(":")[0] + amorpm(startTime) + " - " + endTime.split(":")[0] + amorpm(endTime) + ' ' + dayofWeek[date.getDay()];
                        }
                        return finalTime;
                    }
                };
                FormNodeComponent.prototype.sendSignal = function (signalName) {
                    var payload = {};
                    if (this.implementationType === 'tree') {
                        payload[this.formName] = this.formValues.id;
                        payload["fullName"] = this.formValues.fullName;
                        payload["enterprise"] = this.formValues.enterprise;
                    }
                    else {
                        payload[this.formName] = this.formValues;
                    }
                    _super.prototype.sendSignal.call(this, 'next', payload);
                };
                FormNodeComponent.prototype.getTimeZoneList = function () {
                    var TimeZoneList = [
                        { "key": "-0800", "value": "-08:00 Pacific Time (US & Canada); Yukon; Tijuana" },
                        { "key": "-0700", "value": "-07:00 Mountain Time (US & Canada)" },
                        { "key": "-0600", "value": "-06:00 Central Time (US & Canada); Mexico City, Tegucigalpa" },
                        { "key": "-0500", "value": "-05:00 Eastern Time (US & Canada); Bogota; Lima; Quito" },
                        { "key": "-0430", "value": "-04:30 Caracas" },
                        { "key": "-0400", "value": "-04:00 Atlantic Time (Canada); Caracas, La Paz; Santiago" },
                        { "key": "-0345", "value": "-03:45 Guyana, South America" },
                        { "key": "-0330", "value": "-03:30 Newfoundland; Suriname, South America" },
                        { "key": "-0300", "value": "-03:00 Greenland; Brasilia; Buenos Aires; Puerto Rico" },
                        { "key": "-0200", "value": "-02:00 Mid-Atlantic" },
                        { "key": "-0100", "value": "-01:00 Azores, Cape Verde Is." },
                        { "key": "0000", "value": "00:00 Greenwich Mean Time" },
                        { "key": "0100", "value": "01:00 Amsterdam; Berlin; Bern; Rome; Stockholm; Vienna" },
                        { "key": "0200", "value": "02:00 Athens; Istanbul; Minsk; Jerusalem" },
                        { "key": "0300", "value": "03:00 Baghdad; Kuwait; Moscow" },
                        { "key": "0330", "value": "03:30 Tehran, Iran" },
                        { "key": "0400", "value": "04:00 Abu Dhabi; Muscat" },
                        { "key": "0430", "value": "04:30 Kabul, Afghanistan" },
                        { "key": "0500", "value": "05:00 Ekaterinburg" },
                        { "key": "0530", "value": "05:30 India; Bombay; Calcutta; New Delhi; Sri Lanka" },
                        { "key": "0545", "value": "05:45 Kathmandu, Nepal" },
                        { "key": "0600", "value": "06:00 Astana; Dhaka" },
                        { "key": "0630", "value": "06:30 Cocos Islands; Yangon; Myanmar" },
                        { "key": "0700", "value": "07:00 Bangkok; Hanoi" },
                        { "key": "0800", "value": "08:00 Perth; Singapore; China" },
                        { "key": "0845", "value": "08:45 South Australia" },
                        { "key": "0900", "value": "09:00 Osaka; Tokyo; Seoul" },
                        { "key": "0930", "value": "09:30 Northern Australia" },
                        { "key": "1000", "value": "10:00 Brisbane; Canberra; Sydney; Guam" },
                        { "key": "1100", "value": "11:00 Magadan; Solomon Is.; New Caledonia" },
                        { "key": "1130", "value": "11:30 New Zealand; Norfold Island, Australia" },
                        { "key": "1200", "value": "12:00 Auckland; Wellington; Fiji; Marshall Is.; Tuvalu" },
                        { "key": "1245", "value": "12:45 Chatham Island, New Zealand" },
                        { "key": "1300", "value": "13:00 Nukulalofa; Phoenix Islands" },
                        { "key": "1400", "value": "14:00 Line Islands; Christmas Islands" },
                        { "key": "-1200", "value": "-12:00 Eniwelok, Kwajalein" },
                        { "key": "-1100", "value": "-11:00 Midway Island, Samoa" },
                        { "key": "-1030", "value": "-10:30 Cook Islands" },
                        { "key": "-1000", "value": "-10:00 Hawaii; Western Aleutian Islands" },
                        { "key": "-0930", "value": "-09:30 Marquesas Islands" },
                        { "key": "-0900", "value": "-09:00 Alaska; Eastern Aleutian Islands" },
                        { "key": "-0830", "value": "-08:30 Pitcairn Island" }
                    ];
                    return TimeZoneList;
                };
                FormNodeComponent = __decorate([
                    core_1.Component({
                        selector: 'workflow-form-node',
                        templateUrl: '/src/core/components/workflow/nodes/form-node.component.html',
                        directives: [dynamic_form_component_1.DynamicFormComponent, tree_container_component_1.TreeContainerComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], FormNodeComponent);
                return FormNodeComponent;
            }(abstract_node_1.AbstractNode));
            exports_1("FormNodeComponent", FormNodeComponent);
        }
    }
});
//# sourceMappingURL=form-node.component.js.map