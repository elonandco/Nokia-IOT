System.register(['@angular/core', '../../../reducers/user-preferences.reducer'], function(exports_1, context_1) {
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
    var core_1, user_preferences_reducer_1;
    var WidgetComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_preferences_reducer_1_1) {
                user_preferences_reducer_1 = user_preferences_reducer_1_1;
            }],
        execute: function() {
            WidgetComponent = (function () {
                function WidgetComponent(_store) {
                    var _this = this;
                    this._store = _store;
                    this.title = "Generic Widget";
                    this.isActive = false;
                    this.isSelected = false;
                    this.displaySettings = false;
                    this.type = "";
                    this.refreshing = false;
                    this.fullrefresh = false;
                    this.workflowActive = false;
                    this.isHidden = true;
                    this.userPrefObs = _store.select('UserPreferencesReducer');
                    this.userPrefObsubscription = this.userPrefObs.subscribe(function (data) {
                        var type = _this.type;
                        var w = _.find(_this._store.value.UserPreferencesReducer.widgets, function (widget) {
                            return widget.component === type;
                        });
                        if (w) {
                            if (w.previousHidden && _this.isHidden) {
                                document.getElementById('widgetList').insertBefore(_this._ref._hostElement.nativeElement, document.getElementsByClassName('widget')[0].parentNode);
                                //A small delay is required so that the element has time to move from the code above. If you don't wait, the widget unhide CSS will be off
                                setInterval(function () {
                                    _this.isHidden = w.isHidden;
                                }, 5);
                                _this.onUnhide();
                            }
                        }
                    }, function (error) {
                    });
                    this.dsoObs = _store.select('DSOModelReducer');
                    this.workflowContextObs = _store.select('WorkflowContextReducer');
                }
                WidgetComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.type = this._ref._componentType.name;
                    console.log("Widget OnInit subscribing:::" + this.type);
                    this.dsoObsubscription = this.dsoObs.subscribe(function (data) {
                        var services = _.find(data.domains.domain, function (domain) {
                            return domain.id === "Widgets";
                        }).services.service;
                        var type = _this.type;
                        var campaigns = _.find(services, function (service) {
                            return service.component === type;
                        });
                        /*TODO: UI:Jorge:: Widgets CAN NOT BRING operation for Campaign*/
                        if (campaigns == undefined) {
                            console.log("Widget::Doesn't contained ", type + " service data");
                        }
                        else {
                            if (campaigns.operations != undefined) {
                                var operation = _.cloneDeep(campaigns.operations.operation);
                                _this.refreshOperation = _.remove(operation, function (operation) {
                                    return operation.attributes.hasOwnProperty('type') && operation.attributes.type === "refresh_widget";
                                })[0];
                            }
                            else {
                                console.log("Widget:: " + type + "  Doesn't contained expected operations");
                            }
                        }
                    }, function (error) {
                    });
                    this.workflowContextObs.subscribe(function (data) {
                        /*It is fired when the refresh on widget is done*/
                        if (data.globalContext && data.globalContext.hasOwnProperty(_this.dataObjectName)) {
                            _this.widget_data = data.globalContext[_this.dataObjectName];
                            _this.refreshing = false;
                            _this.workflowActive = false;
                        }
                    }, function (error) {
                    });
                };
                WidgetComponent.prototype.onUnhide = function () { };
                WidgetComponent.prototype.onRefresh = function () {
                    this.refreshing = true;
                    this.workflowName = this.refreshOperation.operationName;
                    this.workflowActive = true;
                    /*TODO: may we need to remove the actual dataobject on refresh from the store,  to don't get updated when
                     * other widget finish its refrsh since any workflow can active the 'workflowContextObs'*/
                    if (this._store.value.WorkflowContextReducer.globalContext
                        && this._store.value.WorkflowContextReducer.globalContext.hasOwnProperty(this.dataObjectName)) {
                        delete this._store.value.WorkflowContextReducer.globalContext[this.dataObjectName];
                    }
                };
                WidgetComponent.prototype.showSettings = function () {
                    this.displaySettings = true;
                };
                WidgetComponent.prototype.isDone = function (evt) {
                };
                WidgetComponent.prototype.close = function () {
                    if (this._store) {
                        var c = this._ref._componentType.name.match(/^(.*)Widget.*/);
                        if (c.length > 0) {
                            this.isSelected = false;
                            this.isActive = false;
                            this._store.dispatch({ type: user_preferences_reducer_1.TOGGLE_WIDGET_VIEW, payload: { 'widget': c[1] } });
                            this.isHidden = true;
                        }
                    }
                    else {
                        console.log("Component that implements this component did not pass the store during construction. Example: super(this)");
                    }
                };
                WidgetComponent.prototype.cancelSettings = function () {
                    this.displaySettings = false;
                };
                WidgetComponent.prototype.hideSettings = function () {
                    this.displaySettings = false;
                };
                WidgetComponent.prototype.onMouseEnter = function () {
                    this.isActive = true;
                };
                WidgetComponent.prototype.onMouseLeave = function () {
                    this.isActive = false;
                };
                WidgetComponent.prototype.onClick = function () {
                    this.isSelected = !this.isSelected;
                };
                WidgetComponent.prototype.ngOnDestroy = function () {
                    console.log("unsubscribing from ngOnDEstroy:::" + this.type);
                    this.dsoObsubscription.unsubscribe();
                    this.userPrefObsubscription.unsubscribe();
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], WidgetComponent.prototype, "isHidden", void 0);
                return WidgetComponent;
            }());
            exports_1("WidgetComponent", WidgetComponent);
        }
    }
});
//# sourceMappingURL=widget.component.js.map