import {Reducer, Action} from '@ngrx/store';
import {UserPreferencesModel} from '../models/user-preferences.model';

export const SET = "SET";
export const UPDATE_WIDGETS = "UPDATE_WIDGETS";
export const TOGGLE_WIDGET_VIEW = "TOGGLE_WIDGET_VIEW";

export const TOGGLE_QUICKLINK = "TOGGLE_QUICKLINK";
export const UPDATE_QUICKLINKS = "UPDATE_QUICKLINKS";

export const WIDGET_REORDER = "WIDGET_REORDER";

export const UPDATE_SETTINGS = "UPDATE_SETTINGS";

const DEFAULT_USER_PREFERENCES_MODEL = new UserPreferencesModel();

export const UserPreferencesReducer:Reducer<UserPreferencesModel> = (state:UserPreferencesModel = DEFAULT_USER_PREFERENCES_MODEL, action:Action ) => {
  switch(action.type){
    case SET:
    {
      return Object.assign({}, UserPreferencesModel, action.payload);
    }

    case UPDATE_SETTINGS:{
      let newState = Object.assign({}, state);
      let widget =  _.find(newState.widgets,function(w:any){return w.name === action.payload.widget.name});
      _.forIn(action.payload.settings,function(value,setting){
        console.log(widget.settings[setting])
        widget.settings[setting] = value
      });
      return newState
    }

    case WIDGET_REORDER:{
      return Object.assign({}, state, {widgetOrder:action.payload});
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
      let newState = Object.assign({}, state);
      let widget =  _.find(newState.widgets,function(w:any){return w.name === action.payload.widget});
      widget.previousHidden = widget.isHidden;
      widget.isHidden = !widget.isHidden;
      return newState;
    }

    case TOGGLE_QUICKLINK:
    {
      // @TODO what if w does not exist?
      let newState = Object.assign({}, state);
      let widget =  _.find(newState.quickLinks,function(w:any){return w.name === action.payload.name});
      widget.hidden = !widget.hidden;
      return newState;
    }

    default:{
      return state
    }
  }
};
