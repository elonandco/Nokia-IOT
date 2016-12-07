System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var WF_EXEC_ACTION_ADD_OR_UPDATE, WF_EXEC_COMPLETE, WorkflowExecutionReducer;
    return {
        setters:[],
        execute: function() {
            exports_1("WF_EXEC_ACTION_ADD_OR_UPDATE", WF_EXEC_ACTION_ADD_OR_UPDATE = 'WF_EXEC_ACTION_ADD_OR_UPDATE');
            exports_1("WF_EXEC_COMPLETE", WF_EXEC_COMPLETE = 'WF_EXEC_COMPLETE');
            exports_1("WorkflowExecutionReducer", WorkflowExecutionReducer = function (state, action) {
                if (state === void 0) { state = []; }
                switch (action.type) {
                    case WF_EXEC_ACTION_ADD_OR_UPDATE:
                        {
                            // If there is a workflow with the same ID remove it
                            var filteredArray = state.filter(function (wfExec) {
                                return wfExec.id != action.payload.id;
                            });
                            // Add the new workflow state
                            filteredArray.push(Object.assign({}, action.payload));
                            return filteredArray;
                        }
                    case WF_EXEC_COMPLETE:
                        {
                            // Remove the workflow execution
                            return state.filter(function (wfExec) { return wfExec.id != action.payload.id; });
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
//# sourceMappingURL=workflow-execution.reducer.js.map