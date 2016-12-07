System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var DASHBOARD_SHOW, DASHBOARD_REFRESH, DASHBOARD_MASTER_REFRESH, DASHBOARD_CREATE, DashboardReducer;
    return {
        setters:[],
        execute: function() {
            exports_1("DASHBOARD_SHOW", DASHBOARD_SHOW = 'DASHBOARD_SHOW');
            exports_1("DASHBOARD_REFRESH", DASHBOARD_REFRESH = 'DASHBOARD_REFRESH');
            exports_1("DASHBOARD_MASTER_REFRESH", DASHBOARD_MASTER_REFRESH = 'DASHBOARD_MASTER_REFRESH');
            exports_1("DASHBOARD_CREATE", DASHBOARD_CREATE = 'DASHBOARD_CREATE');
            exports_1("DashboardReducer", DashboardReducer = function (state, action) {
                if (state === void 0) { state = ""; }
                switch (action.type) {
                    case DASHBOARD_SHOW:
                        return "show";
                    case DASHBOARD_REFRESH:
                        return "refresh";
                    case DASHBOARD_MASTER_REFRESH:
                        return "master_refresh";
                    case DASHBOARD_CREATE:
                        return "create";
                    default:
                        return state;
                }
            });
        }
    }
});
//# sourceMappingURL=dashboard.reducer.js.map