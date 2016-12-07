import {Reducer, Action} from '@ngrx/store';

export const TOGGLE_SIDEBAR_WIDGET = 'TOGGLE_SIDEBAR_WIDGET';
export const TOGGLE_SIDEBAR_GROUP = 'TOGGLE_SIDEBAR_GROUP';
export const SidebarUiContainerReducer:Reducer<string> = (state:string="", action:Action) =>{
  switch (action.type) {
    case TOGGLE_SIDEBAR_WIDGET:
      if (state === 'widget') return "";
      return "widget";
    case TOGGLE_SIDEBAR_GROUP:
      if (state === 'group') return "";
      return "group";
    default:
      return state;
  }
}

export const ADD_GROUP_CONTEXT = 'ADD_GROUP_CONTEXT';
export const REMOVE_GROUP_CONTEXT = 'REMOVE_GROUP_CONTEXT';
export const GroupContextReducer:Reducer<string> = (state:string = "", action) => {
  switch (action.type) {
    case ADD_GROUP_CONTEXT:
      return action.payload;
    default:
      return state;

  }
}
