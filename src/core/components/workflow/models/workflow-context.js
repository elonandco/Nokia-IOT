System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var WorkflowContext;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by jlmayorga on 4/17/16.
             */
            WorkflowContext = (function () {
                function WorkflowContext() {
                    this.globalContext = {};
                    this.workflowSpecificContext = [];
                }
                return WorkflowContext;
            }());
            exports_1("WorkflowContext", WorkflowContext);
        }
    }
});
//# sourceMappingURL=workflow-context.js.map