System.register(['@angular/core', './tree-node.model'], function(exports_1, context_1) {
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
    var core_1, tree_node_model_1;
    var TreeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (tree_node_model_1_1) {
                tree_node_model_1 = tree_node_model_1_1;
            }],
        execute: function() {
            TreeComponent = (function () {
                function TreeComponent() {
                    this.handleNodeChecked = new core_1.EventEmitter();
                }
                TreeComponent.prototype.handleNodeClick = function (id, model) {
                    // update the view model
                    if (model) {
                        model.checkNode();
                    }
                    this.handleNodeChecked.emit({ id: id, checked: model.checked, fullName: model.fullName, enterprise: model.enterprise });
                };
                TreeComponent.prototype.handleNodeCheckedEvent = function (event) {
                    this.handleNodeChecked.emit(event);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', tree_node_model_1.TreeNode)
                ], TreeComponent.prototype, "node", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], TreeComponent.prototype, "handleNodeChecked", void 0);
                TreeComponent = __decorate([
                    core_1.Component({
                        selector: 'tree',
                        directives: [TreeComponent],
                        template: "\n  <ul class=\"tree-container\" >\n    <li class=\"tree-node\" *ngFor=\"let group of node\">\n      <div class=\"tree-content level-{{group.level}}\" [ngClass]=\"{selected:group.checked}\">\n        <i *ngIf=\"!group.isLeaf\" (click)=\"group.toggle()\" class=\"tree-icon fa fa-caret-right\" [ngClass]=\"{'fa-rotate-90': group.expanded}\"></i>\n        <div class=\"tree-wholerow\" (click)=\"handleNodeClick(group.id, group)\">{{ group.name }}</div>\n      </div>\n      <div *ngIf=\"group.expanded\">\n         <tree [node]=\"group.subnodes\"  (handleNodeChecked)=\"handleNodeCheckedEvent($event)\"></tree>\n      </div>\n    </li>\n  </ul>\n"
                    }), 
                    __metadata('design:paramtypes', [])
                ], TreeComponent);
                return TreeComponent;
            }());
            exports_1("TreeComponent", TreeComponent);
        }
    }
});
//# sourceMappingURL=tree.component.js.map