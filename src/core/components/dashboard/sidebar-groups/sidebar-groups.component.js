System.register(['@angular/core', '@ngrx/store', '../../../reducers/sidebar-groups.reducer', '../../tree/tree-container.component'], function(exports_1, context_1) {
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
    var core_1, store_1, sidebar_groups_reducer_1, tree_container_component_1;
    var SidebarGroupComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (sidebar_groups_reducer_1_1) {
                sidebar_groups_reducer_1 = sidebar_groups_reducer_1_1;
            },
            function (tree_container_component_1_1) {
                tree_container_component_1 = tree_container_component_1_1;
            }],
        execute: function() {
            SidebarGroupComponent = (function () {
                function SidebarGroupComponent(_store) {
                    this._store = _store;
                    this._currentGroupInfoSelected = "";
                    this.disabledClass = "button-disabled";
                }
                SidebarGroupComponent.prototype.handleClickEvent = function (event) {
                    this._currentGroupInfoSelected = event;
                    this.disabledClass = "";
                };
                SidebarGroupComponent.prototype.handleRefreshClick = function () {
                    if (this._currentGroupSelected != "") {
                        this._store.dispatch({ type: sidebar_groups_reducer_1.ADD_GROUP_CONTEXT, payload: { selectedGroupId: this._currentGroupInfoSelected.id, fullName: this._currentGroupInfoSelected.fullName, enterprise: this._currentGroupInfoSelected.enterprise, isRoot: true, beginFlowMode: "REFRESH_GROUPS_TREE" } });
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], SidebarGroupComponent.prototype, "show", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], SidebarGroupComponent.prototype, "treeData", void 0);
                SidebarGroupComponent = __decorate([
                    core_1.Component({
                        selector: 'sidebar-groups',
                        directives: [tree_container_component_1.TreeContainerComponent],
                        templateUrl: '/src/core/components/dashboard/sidebar-groups/sidebar-groups.component.html'
                    }), 
                    __metadata('design:paramtypes', [store_1.Store])
                ], SidebarGroupComponent);
                return SidebarGroupComponent;
            }());
            exports_1("SidebarGroupComponent", SidebarGroupComponent);
        }
    }
});
//# sourceMappingURL=sidebar-groups.component.js.map