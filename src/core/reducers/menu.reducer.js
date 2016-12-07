System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TOGGLE_MENU, CLOSE_MENU, MenuReducer;
    return {
        setters:[],
        execute: function() {
            exports_1("TOGGLE_MENU", TOGGLE_MENU = "TOGGLE_MENU");
            exports_1("CLOSE_MENU", CLOSE_MENU = "CLOSE_MENU");
            exports_1("MenuReducer", MenuReducer = function (state, action) {
                if (state === void 0) { state = false; }
                switch (action.type) {
                    case TOGGLE_MENU:
                        {
                            return !state;
                        }
                    case CLOSE_MENU: {
                        return false;
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
//# sourceMappingURL=menu.reducer.js.map