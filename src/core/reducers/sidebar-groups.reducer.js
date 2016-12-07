System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TOGGLE_SIDEBAR_WIDGET, TOGGLE_SIDEBAR_GROUP, SidebarUiContainerReducer, ADD_GROUP_CONTEXT, REMOVE_GROUP_CONTEXT, GroupContextReducer;
    return {
        setters:[],
        execute: function() {
            exports_1("TOGGLE_SIDEBAR_WIDGET", TOGGLE_SIDEBAR_WIDGET = 'TOGGLE_SIDEBAR_WIDGET');
            exports_1("TOGGLE_SIDEBAR_GROUP", TOGGLE_SIDEBAR_GROUP = 'TOGGLE_SIDEBAR_GROUP');
            exports_1("SidebarUiContainerReducer", SidebarUiContainerReducer = function (state, action) {
                if (state === void 0) { state = ""; }
                switch (action.type) {
                    case TOGGLE_SIDEBAR_WIDGET:
                        if (state === 'widget')
                            return "";
                        return "widget";
                    case TOGGLE_SIDEBAR_GROUP:
                        if (state === 'group')
                            return "";
                        return "group";
                    default:
                        return state;
                }
            });
            exports_1("ADD_GROUP_CONTEXT", ADD_GROUP_CONTEXT = 'ADD_GROUP_CONTEXT');
            exports_1("REMOVE_GROUP_CONTEXT", REMOVE_GROUP_CONTEXT = 'REMOVE_GROUP_CONTEXT');
            exports_1("GroupContextReducer", GroupContextReducer = function (state, action) {
                if (state === void 0) { state = ""; }
                switch (action.type) {
                    case ADD_GROUP_CONTEXT:
                        return action.payload;
                    default:
                        return state;
                }
            });
        }
    }
});
//# sourceMappingURL=sidebar-groups.reducer.js.map