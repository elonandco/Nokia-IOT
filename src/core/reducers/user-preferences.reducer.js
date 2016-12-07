System.register(['../models/user-preferences.model'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var user_preferences_model_1;
    var SET, UPDATE_WIDGETS, TOGGLE_WIDGET_VIEW, TOGGLE_QUICKLINK, UPDATE_QUICKLINKS, WIDGET_REORDER, UPDATE_SETTINGS, DEFAULT_USER_PREFERENCES_MODEL, UserPreferencesReducer;
    return {
        setters:[
            function (user_preferences_model_1_1) {
                user_preferences_model_1 = user_preferences_model_1_1;
            }],
        execute: function() {
            exports_1("SET", SET = "SET");
            exports_1("UPDATE_WIDGETS", UPDATE_WIDGETS = "UPDATE_WIDGETS");
            exports_1("TOGGLE_WIDGET_VIEW", TOGGLE_WIDGET_VIEW = "TOGGLE_WIDGET_VIEW");
            exports_1("TOGGLE_QUICKLINK", TOGGLE_QUICKLINK = "TOGGLE_QUICKLINK");
            exports_1("UPDATE_QUICKLINKS", UPDATE_QUICKLINKS = "UPDATE_QUICKLINKS");
            exports_1("WIDGET_REORDER", WIDGET_REORDER = "WIDGET_REORDER");
            exports_1("UPDATE_SETTINGS", UPDATE_SETTINGS = "UPDATE_SETTINGS");
            DEFAULT_USER_PREFERENCES_MODEL = new user_preferences_model_1.UserPreferencesModel();
            exports_1("UserPreferencesReducer", UserPreferencesReducer = function (state, action) {
                if (state === void 0) { state = DEFAULT_USER_PREFERENCES_MODEL; }
                switch (action.type) {
                    case SET:
                        {
                            return Object.assign({}, user_preferences_model_1.UserPreferencesModel, action.payload);
                        }
                    case UPDATE_SETTINGS: {
                        var newState = Object.assign({}, state);
                        var widget_1 = _.find(newState.widgets, function (w) { return w.name === action.payload.widget.name; });
                        _.forIn(action.payload.settings, function (value, setting) {
                            console.log(widget_1.settings[setting]);
                            widget_1.settings[setting] = value;
                        });
                        return newState;
                    }
                    case WIDGET_REORDER: {
                        return Object.assign({}, state, { widgetOrder: action.payload });
                    }
                    case UPDATE_WIDGETS:
                        {
                            action.payload.widgetsLoaded = true;
                            return Object.assign({}, state, action.payload);
                        }
                    case UPDATE_QUICKLINKS:
                        {
                            action.payload.quickLinksloaded = true;
                            return Object.assign({}, state, action.payload);
                        }
                    case TOGGLE_WIDGET_VIEW:
                        {
                            // @TODO what if w does not exist?
                            var newState = Object.assign({}, state);
                            var widget = _.find(newState.widgets, function (w) { return w.name === action.payload.widget; });
                            widget.previousHidden = widget.isHidden;
                            widget.isHidden = !widget.isHidden;
                            return newState;
                        }
                    case TOGGLE_QUICKLINK:
                        {
                            // @TODO what if w does not exist?
                            var newState = Object.assign({}, state);
                            var widget = _.find(newState.quickLinks, function (w) { return w.name === action.payload.name; });
                            widget.hidden = !widget.hidden;
                            return newState;
                        }
                    default: {
                        return state;
                    }
                }
            });
        }
    }
});
//# sourceMappingURL=user-preferences.reducer.js.map