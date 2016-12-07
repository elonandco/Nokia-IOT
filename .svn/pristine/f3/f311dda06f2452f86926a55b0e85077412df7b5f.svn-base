import {Reducer, Action} from '@ngrx/store';

export const TOGGLE_MENU = "TOGGLE_MENU";
export const CLOSE_MENU = "CLOSE_MENU";

export const MenuReducer:Reducer<any> = (state:boolean = false, action:Action)=> {
  switch (action.type) {
    case TOGGLE_MENU:
    {
      return !state;
    }
    case CLOSE_MENU:{
      return false;
    }
    default:
    {
      return state
    }
  }
};

