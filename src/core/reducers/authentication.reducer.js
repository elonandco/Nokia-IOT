System.register(['../models/authentication.model'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var authentication_model_1;
    var LOGIN, LOGOUT, DEFAULT_AUTHENTICATION_MODEL, AuthenticationReducer;
    return {
        setters:[
            function (authentication_model_1_1) {
                authentication_model_1 = authentication_model_1_1;
            }],
        execute: function() {
            exports_1("LOGIN", LOGIN = "LOGIN");
            exports_1("LOGOUT", LOGOUT = "LOGOUT");
            DEFAULT_AUTHENTICATION_MODEL = new authentication_model_1.AuthenticationModel();
            exports_1("AuthenticationReducer", AuthenticationReducer = function (state, action) {
                if (state === void 0) { state = DEFAULT_AUTHENTICATION_MODEL; }
                switch (action.type) {
                    case LOGIN:
                        {
                            return Object.assign({}, authentication_model_1.AuthenticationModel, action.payload);
                        }
                    case LOGOUT:
                        {
                            return DEFAULT_AUTHENTICATION_MODEL;
                        }
                    default: {
                        return state;
                    }
                }
            });
        }
    }
});
//# sourceMappingURL=authentication.reducer.js.map