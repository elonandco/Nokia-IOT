System.register(["@angular/core", "@angular/common", "./abstract-node"], function(exports_1, context_1) {
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
    var core_1, common_1, abstract_node_1;
    var PromptNodeComponent;
    function promptValidator(control) {
        if (!control.value.match(this.pattern)) {
            return { invalidPromptInput: true };
        }
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (abstract_node_1_1) {
                abstract_node_1 = abstract_node_1_1;
            }],
        execute: function() {
            PromptNodeComponent = (function (_super) {
                __extends(PromptNodeComponent, _super);
                function PromptNodeComponent(fb) {
                    _super.call(this);
                    this.pattern = /^456/;
                    this.form = fb.group({
                        'promptInput': ['', common_1.Validators.compose([common_1.Validators.required, promptValidator.bind(this)])]
                    });
                    this.promptInput = this.form.controls['promptInput'];
                }
                PromptNodeComponent = __decorate([
                    core_1.Component({
                        selector: 'workflow-prompt-node',
                        templateUrl: '/src/core/components/workflow/nodes/prompt-node.component.html',
                        directives: [common_1.FORM_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder])
                ], PromptNodeComponent);
                return PromptNodeComponent;
            }(abstract_node_1.AbstractNode));
            exports_1("PromptNodeComponent", PromptNodeComponent);
        }
    }
});
//# sourceMappingURL=prompt-node.component.js.map