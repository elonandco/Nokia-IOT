System.register(['@angular/core', './tree.component', './tree-node.model'], function(exports_1, context_1) {
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
    var core_1, tree_component_1, tree_node_model_1;
    var TreeContainerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (tree_component_1_1) {
                tree_component_1 = tree_component_1_1;
            },
            function (tree_node_model_1_1) {
                tree_node_model_1 = tree_node_model_1_1;
            }],
        execute: function() {
            TreeContainerComponent = (function () {
                function TreeContainerComponent() {
                    this.currentGroupSelected = "";
                    this.node = [];
                    this.handleClick = new core_1.EventEmitter();
                }
                TreeContainerComponent.prototype.ngOnChanges = function (changes) {
                    this.node = this.parseTreeJson(this.treeJson);
                };
                TreeContainerComponent.prototype.handleClickEvent = function (event) {
                    this.handleClick.emit(event);
                };
                TreeContainerComponent.prototype.handleGroupChecked = function (event) {
                    this.currentGroupSelected = event.id;
                    this.updateTreeCheckStatus(event.id);
                    this.handleClickEvent(event);
                };
                /**
                 * Get an array of all checked node IDs from the tree model
                 * @returns { Array<any> }
                 */
                TreeContainerComponent.prototype.getAllCheckedNodes = function () {
                    return this.getAllCheckedNodesRecursive(this.node);
                };
                TreeContainerComponent.prototype.expandAll = function () {
                    this.expandAllRecursive(this.node);
                };
                // PRIVATE METHODS
                /**
                 * Expand all the tree nodes
                 * @param source An array containing the model of the tree
                 */
                TreeContainerComponent.prototype.expandAllRecursive = function (source) {
                    var _this = this;
                    source.forEach(function (node) {
                        node.expanded = true;
                        if (node.subnodes.length > 0) {
                            _this.expandAllRecursive(node.subnodes);
                        }
                    });
                };
                /**
                 * Get an array of all checked node IDs from the tree model
                 * @param source An array containing the model of the tree
                 * @param result An empty array for the resulted tree IDs
                 * @returns {result}
                 */
                TreeContainerComponent.prototype.getAllCheckedNodesRecursive = function (source, result) {
                    var _this = this;
                    if (result === void 0) { result = []; }
                    source.forEach(function (node) {
                        if (node.checked) {
                            result.push(node.id);
                        }
                        if (node.subnodes.length > 0) {
                            _this.getAllCheckedNodesRecursive(node.subnodes, result);
                        }
                    });
                    return result;
                };
                /**
                 * Create the tree model which is used in the tree component from a provided json data
                 * @param json The tree JSON
                 * @returns {target}
                 */
                TreeContainerComponent.prototype.parseTreeJson = function (json) {
                    // start parsing only if there is at least one group
                    if (json.groups && json.groups.length > 0) {
                        return this.parseTreeJsonRecursive(json.groups);
                    }
                    else {
                        // return a empty array even if invalid json
                        return [];
                    }
                };
                /**
                 * Create the tree model which is used in the tree component from a provided json data
                 * @param source An array containing the tree in JSON format
                 * @param target An empty TreeNode array for the resulted tree model
                 * @param depth (optional) A number represents the node depth in the tree
                 * @returns {target}
                 */
                TreeContainerComponent.prototype.parseTreeJsonRecursive = function (source, target, depth) {
                    var _this = this;
                    if (target === void 0) { target = []; }
                    if (depth === void 0) { depth = 0; }
                    depth++;
                    source.forEach(function (d) {
                        var menuGroup = new tree_node_model_1.TreeNode(d.id, d.displayName);
                        menuGroup.name = d.displayName;
                        menuGroup.fullName = d.fullName;
                        menuGroup.enterprise = d.fullName.split(".").slice(0, 3).join(".");
                        if (d.attributes != undefined) {
                            menuGroup.checked = d.attributes.checked;
                        }
                        if (depth < 2) {
                            menuGroup.expanded = true;
                        }
                        menuGroup.level = depth;
                        if (d.groups.length > 0) {
                            target.push(menuGroup);
                            _this.parseTreeJsonRecursive(d.groups, menuGroup.subnodes, depth);
                        }
                        else {
                            menuGroup.isLeaf = true;
                            target.push(menuGroup);
                        }
                    });
                    return target;
                };
                TreeContainerComponent.prototype.updateTreeCheckStatus = function (nodeCheckedId) {
                    this.updateTreeCheckStatusRecursive(this.node, nodeCheckedId, false);
                };
                TreeContainerComponent.prototype.updateTreeCheckStatusRecursive = function (node, nodeCheckedId, isParentChecked) {
                    var _this = this;
                    node.forEach(function (d) {
                        if (d.id === nodeCheckedId || isParentChecked) {
                            d.checked = true;
                            if (d.subnodes.length > 0) {
                                _this.updateTreeCheckStatusRecursive(d.subnodes, nodeCheckedId, true);
                            }
                        }
                        else {
                            d.checked = false;
                            if (d.subnodes.length > 0) {
                                _this.updateTreeCheckStatusRecursive(d.subnodes, nodeCheckedId, false);
                            }
                        }
                    });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], TreeContainerComponent.prototype, "treeJson", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], TreeContainerComponent.prototype, "handleClick", void 0);
                TreeContainerComponent = __decorate([
                    core_1.Component({
                        selector: 'tree-container',
                        directives: [tree_component_1.TreeComponent],
                        template: "\n  <div class=\"tree\">\n   <tree [node]=\"node\" (handleNodeChecked)=\"handleGroupChecked($event)\" ></tree>\n  </div>\n"
                    }), 
                    __metadata('design:paramtypes', [])
                ], TreeContainerComponent);
                return TreeContainerComponent;
            }());
            exports_1("TreeContainerComponent", TreeContainerComponent);
        }
    }
});
//# sourceMappingURL=tree-container.component.js.map