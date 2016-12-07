System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AuthenticationModel;
    return {
        setters:[],
        execute: function() {
            AuthenticationModel = (function () {
                function AuthenticationModel(auth) {
                    if (auth === void 0) { auth = undefined; }
                    if (auth) {
                        this.sessionId = auth.sessionId;
                        this.subscriberId = auth.subscriberId;
                        this.anonymous = auth.anonymous;
                    }
                    else {
                        this.sessionId = "";
                        this.subscriberId = "";
                        this.anonymous = undefined;
                    }
                }
                return AuthenticationModel;
            }());
            exports_1("AuthenticationModel", AuthenticationModel);
        }
    }
});
//# sourceMappingURL=authentication.model.js.map