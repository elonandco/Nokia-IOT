System.register(['@angular/core', 'ng2-dragula/ng2-dragula', '@ngrx/store', '../../../reducers/user-preferences.reducer'], function(exports_1, context_1) {
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
    var core_1, ng2_dragula_1, store_1, user_preferences_reducer_1;
    var WidgetContainerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_dragula_1_1) {
                ng2_dragula_1 = ng2_dragula_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (user_preferences_reducer_1_1) {
                user_preferences_reducer_1 = user_preferences_reducer_1_1;
            }],
        execute: function() {
            WidgetContainerComponent = (function () {
                function WidgetContainerComponent(_dcl, dragulaService, _store) {
                    var _this = this;
                    this._dcl = _dcl;
                    this._store = _store;
                    this.loadedWidgets = [];
                    this.widgetIdx = 0;
                    this.widgetsArray = [];
                    this.loadedWidgetsCompon = [];
                    var drake = dragulaService.find('widgets-bag');
                    if (drake) {
                        dragulaService.destroy('widgets-bag');
                    }
                    dragulaService.setOptions('widgets-bag', {
                        direction: 'horizontal',
                        accepts: function (el, target, source, sibling) {
                            return target.id !== 'sidebarDragulaContainer';
                        }
                    });
                    dragulaService.drop.subscribe(function (value) {
                        _this.onDragReOrder();
                    });
                    this.userPrefObs = this._store.select('UserPreferencesReducer');
                    this.userPrefObsubscription = this.userPrefObs.subscribe(function (data) {
                        if (_this.userPrefObs === null) {
                            return;
                        }
                        if (data.widgets) {
                            _this.loadWidgets(data.widgets);
                        }
                    }, function (error) {
                    });
                }
                WidgetContainerComponent.prototype.onDragReOrder = function () {
                    var widgetElements = Array.prototype.slice.call(document.getElementsByClassName('widget'));
                    var widgetOrderArray = [];
                    _.each(widgetElements, function (ele) {
                        widgetOrderArray.push(ele.getAttribute('type'));
                    });
                    this._store.dispatch({ type: user_preferences_reducer_1.WIDGET_REORDER, payload: widgetOrderArray });
                };
                WidgetContainerComponent.prototype.loadWidgets = function (widgets) {
                    this.userPrefObs = null;
                    var widgets = this.reorderWidgets(widgets);
                    this.widgetsArray = widgets;
                    this.loadWidget(widgets[0]);
                };
                WidgetContainerComponent.prototype.loadWidget = function (widget) {
                    var _this = this;
                    return System.import(widget.path).then(function (componentModule) { return componentModule[widget.component]; }).then(function (component) {
                        var _objectWidget = _this.processWidget(component, widget);
                        _this.loadedWidgetsCompon.push(_objectWidget);
                        return _objectWidget;
                    });
                };
                WidgetContainerComponent.prototype.processWidget = function (component, widget) {
                    var _this = this;
                    var _object = this._dcl.loadNextToLocation(component, this.childContentPlace);
                    _object.then(function (ref) {
                        _this.widgetIdx += 1;
                        ref.instance._ref = ref;
                        ref.instance['isHidden'] = widget.isHidden;
                        if (_this.widgetIdx < _this.widgetsArray.length) {
                            _this.loadWidget(_this.widgetsArray[_this.widgetIdx]);
                        }
                    });
                    return _object;
                };
                WidgetContainerComponent.prototype.reorderWidgets = function (widgets) {
                    var widgetsOrder = this._store.value.UserPreferencesReducer.widgetOrder;
                    var newWidgetsOrder = [], loadedWidgets = [], widgetsNotLoaded = [];
                    _.each(widgets, function (widget) {
                        var foundWidget = _.find(widgetsOrder, function (orderedWidget) {
                            return orderedWidget === widget.component;
                        });
                        if (foundWidget) {
                            loadedWidgets.push(widget);
                        }
                        else {
                            widgetsNotLoaded.push(widget);
                        }
                    });
                    _.each(widgetsOrder, function (orderedWidget) {
                        var widget = _.find(loadedWidgets, function (loadedWidget) {
                            return orderedWidget === loadedWidget.component;
                        });
                        newWidgetsOrder.push(widget);
                    });
                    newWidgetsOrder = newWidgetsOrder.concat(widgetsNotLoaded);
                    return newWidgetsOrder;
                };
                WidgetContainerComponent.prototype.ngOnDestroy = function () {
                    console.log("destruying widget-container:::");
                    this.userPrefObsubscription.unsubscribe();
                };
                __decorate([
                    core_1.ViewChild('content', { read: core_1.ViewContainerRef }), 
                    __metadata('design:type', core_1.ViewContainerRef)
                ], WidgetContainerComponent.prototype, "childContentPlace", void 0);
                WidgetContainerComponent = __decorate([
                    core_1.Component({
                        selector: 'widget-container',
                        templateUrl: '/src/core/components/dashboard/widgets/widget-container.component.html',
                        directives: [ng2_dragula_1.Dragula],
                        viewProviders: [ng2_dragula_1.Dragula]
                    }), 
                    __metadata('design:paramtypes', [core_1.DynamicComponentLoader, ng2_dragula_1.DragulaService, store_1.Store])
                ], WidgetContainerComponent);
                return WidgetContainerComponent;
            }());
            exports_1("WidgetContainerComponent", WidgetContainerComponent);
        }
    }
});
//# sourceMappingURL=widget-container.component.js.map