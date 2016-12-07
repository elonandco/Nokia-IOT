System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TreeNode;
    return {
        setters:[],
        execute: function() {
            TreeNode = (function () {
                function TreeNode(id, name, subnodes) {
                    this.id = id;
                    this.name = name;
                    this.subnodes = subnodes;
                    this.expanded = false;
                    this.checked = false;
                    this.level = 0;
                    this.isLeaf = false;
                    this.enterprise = "";
                    this.fullName = "";
                    if (!subnodes) {
                        this.subnodes = [];
                    }
                }
                TreeNode.prototype.checkNode = function () {
                    this.checked = !this.checked;
                    this.checkNodeRecursive(this.checked);
                };
                TreeNode.prototype.toggle = function () {
                    this.expanded = !this.expanded;
                };
                TreeNode.prototype.checkNodeRecursive = function (state) {
                    this.subnodes.forEach(function (node) {
                        node.checked = state;
                        node.checkNodeRecursive(state);
                    });
                };
                return TreeNode;
            }());
            exports_1("TreeNode", TreeNode);
        }
    }
});
//# sourceMappingURL=tree-node.model.js.map