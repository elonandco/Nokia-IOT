System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var INIT_WF_STARTING, INIT_WF_RUNNING, INIT_WF_COMPLETED, INIT_WF_ERROR, INIT_WF_RESET, InitWorkflowReducer;
    return {
        setters:[],
        execute: function() {
            exports_1("INIT_WF_STARTING", INIT_WF_STARTING = "INIT_WF_STARTING");
            exports_1("INIT_WF_RUNNING", INIT_WF_RUNNING = "INIT_WF_RUNNING");
            exports_1("INIT_WF_COMPLETED", INIT_WF_COMPLETED = "INIT_WF_COMPLETED");
            exports_1("INIT_WF_ERROR", INIT_WF_ERROR = "INIT_WF_ERROR");
            exports_1("INIT_WF_RESET", INIT_WF_RESET = "INIT_WF_RESET");
            exports_1("InitWorkflowReducer", InitWorkflowReducer = function (state, action) {
                if (state === void 0) { state = { status: "" }; }
                switch (action.type) {
                    case INIT_WF_STARTING:
                        {
                            return Object.assign({}, action.payload);
                        }
                    case INIT_WF_RUNNING:
                        {
                            return Object.assign({}, action.payload);
                        }
                    case INIT_WF_COMPLETED:
                        {
                            return Object.assign({}, action.payload);
                        }
                    case INIT_WF_ERROR:
                        {
                            return Object.assign({}, action.payload);
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
//# sourceMappingURL=init-workflow.reducer.js.map