System.register(["@angular/core", '@ngrx/store', "../../toggleButton/toggle-button.componet", "../../../reducers/user-preferences.reducer"], function(exports_1, context_1) {
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
    var core_1, store_1, toggle_button_componet_1, user_preferences_reducer_1;
    var SidebarWidgetComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (toggle_button_componet_1_1) {
                toggle_button_componet_1 = toggle_button_componet_1_1;
            },
            function (user_preferences_reducer_1_1) {
                user_preferences_reducer_1 = user_preferences_reducer_1_1;
            }],
        execute: function() {
            SidebarWidgetComponent = (function () {
                function SidebarWidgetComponent(store) {
                    var _this = this;
                    this.store = store;
                    this.widgetArray = [];
                    this.linkArray = [];
                    this.widgetObs = this.store.select('UserPreferencesReducer');
                    this.widgetObs.subscribe(function (data) {
                        if (data) {
                            if (data.widgets) {
                                _this.widgetArray = [];
                                for (var i = 0; i < data.widgets.length; i++) {
                                    if (data.widgets[i].isHidden) {
                                        _this.widgetArray.push(data.widgets[i]);
                                    }
                                }
                            }
                            if (data.quickLinks) {
                                _this.linkArray = [];
                                for (var i = 0; i < data.quickLinks.length; i++) {
                                    _this.linkArray.push(data.quickLinks[i]);
                                }
                            }
                        }
                    });
                }
                SidebarWidgetComponent.prototype.onWidgetClick = function (evt) {
                    var _this = this;
                    var oldClass = evt.target.className, classArray = oldClass.split(' ');
                    classArray.push('closing');
                    evt.target.className = classArray.join(' ');
                    setTimeout(function (x) {
                        evt.target.className = oldClass;
                        _this.store.dispatch({ type: user_preferences_reducer_1.TOGGLE_WIDGET_VIEW, payload: { 'widget': evt.target.id } });
                    }, 250);
                };
                SidebarWidgetComponent.prototype.quickLinkToggle = function (link) {
                    link.isHidden = !link.isHidden;
                    this.store.dispatch({ type: user_preferences_reducer_1.TOGGLE_QUICKLINK, payload: link });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], SidebarWidgetComponent.prototype, "show", void 0);
                SidebarWidgetComponent = __decorate([
                    core_1.Component({
                        selector: 'sidebar-widgets',
                        templateUrl: '/src/core/components/dashboard/sidebar-widgets/sidebar-widgets.component.html',
                        directives: [toggle_button_componet_1.ToggleButtonComponent]
                    }), 
                    __metadata('design:paramtypes', [store_1.Store])
                ], SidebarWidgetComponent);
                return SidebarWidgetComponent;
            }());
            exports_1("SidebarWidgetComponent", SidebarWidgetComponent);
        }
    }
});
//# sourceMappingURL=sidebar-widgets.component.js.map