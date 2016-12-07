System.register(['../models/dso.model'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var dso_model_1;
    var DSO_MODEL_ACTION_UPDATE, DSO_MODEL_ACTION_ADD_OR_UPDATE_ACCOUNT, DSO_MODEL_ACTION_ADD_OR_UPDATE_DOMAIN, DSO_MODEL_ACTION_ADD_OR_UPDATE_SERVICE, DSO_MODEL_ACTION_ADD_OR_UPDATE_OPERATION, DSOModelReducer;
    return {
        setters:[
            function (dso_model_1_1) {
                dso_model_1 = dso_model_1_1;
            }],
        execute: function() {
            exports_1("DSO_MODEL_ACTION_UPDATE", DSO_MODEL_ACTION_UPDATE = 'DSO_MODEL_ACTION_UPDATE');
            exports_1("DSO_MODEL_ACTION_ADD_OR_UPDATE_ACCOUNT", DSO_MODEL_ACTION_ADD_OR_UPDATE_ACCOUNT = 'DSO_MODEL_ACTION_ADD_OR_UPDATE_ACCOUNT');
            exports_1("DSO_MODEL_ACTION_ADD_OR_UPDATE_DOMAIN", DSO_MODEL_ACTION_ADD_OR_UPDATE_DOMAIN = 'DSO_MODEL_ACTION_ADD_OR_UPDATE_DOMAIN');
            exports_1("DSO_MODEL_ACTION_ADD_OR_UPDATE_SERVICE", DSO_MODEL_ACTION_ADD_OR_UPDATE_SERVICE = 'DSO_MODEL_ACTION_ADD_OR_UPDATE_SERVICE');
            exports_1("DSO_MODEL_ACTION_ADD_OR_UPDATE_OPERATION", DSO_MODEL_ACTION_ADD_OR_UPDATE_OPERATION = 'DSO_MODEL_ACTION_ADD_OR_UPDATE_OPERATION');
            exports_1("DSOModelReducer", DSOModelReducer = function (state, action) {
                switch (action.type) {
                    case DSO_MODEL_ACTION_ADD_OR_UPDATE_ACCOUNT:
                        {
                            return Object.assign({}, state, action.payload);
                        }
                    case DSO_MODEL_ACTION_ADD_OR_UPDATE_DOMAIN:
                        {
                            var payload = action.payload;
                            var newState = Object.assign({}, state);
                            if (!newState.domains) {
                                newState.domains = {};
                                newState.domains.domain = payload;
                            }
                            else {
                            }
                            return newState;
                        }
                    case DSO_MODEL_ACTION_ADD_OR_UPDATE_SERVICE:
                        {
                            var newState = Object.assign({}, state);
                            var payload_1 = action.payload;
                            newState.domains.domain = newState.domains.domain.map(function (domain) {
                                //TODO: merge old state with new state
                                domain.services = {};
                                domain.services.service = payload_1.filter(function (service) {
                                    return domain.name === service.domain.name;
                                });
                                return domain;
                            });
                            return newState;
                        }
                    case DSO_MODEL_ACTION_ADD_OR_UPDATE_OPERATION:
                        {
                            var newState = Object.assign({}, state);
                            var payload_2 = action.payload;
                            newState.domains.domain = newState.domains.domain.map(function (domain) {
                                domain.services.service.map(function (service) {
                                    //TODO: merge old state with new state
                                    service.operations = {};
                                    service.operations.operation = payload_2.filter(function (operation) {
                                        return (service.name === operation.service.name && domain.name === operation.service.domain.name);
                                    });
                                    return service;
                                });
                                return domain;
                            });
                            return newState;
                        }
                    case DSO_MODEL_ACTION_UPDATE:
                        {
                            return Object.assign({}, dso_model_1.DSOModel, action.payload);
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
//# sourceMappingURL=dso-model.reducer.js.map