import {Reducer, Action} from '@ngrx/store';
import {AuthenticationModel} from '../models/authentication.model';

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
const DEFAULT_AUTHENTICATION_MODEL = new AuthenticationModel();

export const AuthenticationReducer:Reducer<AuthenticationModel> = (state:AuthenticationModel = DEFAULT_AUTHENTICATION_MODEL, action:Action ) => {
  switch(action.type){
    case LOGIN:
    {
      return Object.assign({}, AuthenticationModel, action.payload);
    }
    case LOGOUT:
    {
      return DEFAULT_AUTHENTICATION_MODEL;
    }
    default:{
      return state
    }
  }
};
