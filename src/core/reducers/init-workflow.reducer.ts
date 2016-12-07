import {Reducer, Action} from '@ngrx/store';

export const INIT_WF_STARTING:string = "INIT_WF_STARTING";
export const INIT_WF_RUNNING:string = "INIT_WF_RUNNING";
export const INIT_WF_COMPLETED:string = "INIT_WF_COMPLETED";
export const INIT_WF_ERROR:string = "INIT_WF_ERROR";
export const INIT_WF_RESET:string = "INIT_WF_RESET";

export const InitWorkflowReducer:Reducer<any> = (state:any = {status: ""}, action:Action)=> {
  switch (action.type) {
    case INIT_WF_STARTING:
    {
      return Object.assign({}, action.payload);
    }
    case INIT_WF_RUNNING:
    {
      return Object.assign({}, action.payload);
    }
    case INIT_WF_COMPLETED:
    {
      return Object.assign({}, action.payload);
    }
    case INIT_WF_ERROR:
    {
      return Object.assign({}, action.payload);
    }
    default:
    {
      return state
    }
  }
};
