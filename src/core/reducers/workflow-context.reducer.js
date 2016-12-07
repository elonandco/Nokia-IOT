System.register(['../components/workflow/models/workflow-context'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var workflow_context_1;
    var WF_CTX_ACTION_UPDATE, WorkflowContextReducer;
    return {
        setters:[
            function (workflow_context_1_1) {
                workflow_context_1 = workflow_context_1_1;
            }],
        execute: function() {
            exports_1("WF_CTX_ACTION_UPDATE", WF_CTX_ACTION_UPDATE = 'WF_CTX_ACTION_UPDATE');
            exports_1("WorkflowContextReducer", WorkflowContextReducer = function (state, action) {
                if (state === void 0) { state = new workflow_context_1.WorkflowContext(); }
                switch (action.type) {
                    case WF_CTX_ACTION_UPDATE:
                        {
                            var payload = action.payload;
                            //Clone the existing state and update with payload state, payload state will overwrite existing state if existing.
                            var clonedGlobalCtx = Object.assign({}, state.globalContext, payload);
                            var clonedWfSpecificCtx = Object.assign([], state.workflowSpecificContext, payload.workflowSpecificContext);
                            // Create a new workflow context with the merged properties
                            var newWfCtx = new workflow_context_1.WorkflowContext();
                            newWfCtx.globalContext = clonedGlobalCtx;
                            newWfCtx.workflowSpecificContext = clonedWfSpecificCtx;
                            return newWfCtx;
                        }
                    default:
                        {
                            return state;
                        }
                }
            });
        }
    }
});
//# sourceMappingURL=workflow-context.reducer.js.map