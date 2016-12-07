import {Reducer, Action} from '@ngrx/store';

export const DASHBOARD_SHOW = 'DASHBOARD_SHOW';
export const DASHBOARD_REFRESH = 'DASHBOARD_REFRESH';
export const DASHBOARD_MASTER_REFRESH = 'DASHBOARD_MASTER_REFRESH';
export const DASHBOARD_CREATE = 'DASHBOARD_CREATE';

export const DashboardReducer:Reducer<string> = (state:string = "", action:Action) => {
  switch (action.type) {
    case DASHBOARD_SHOW:
      return "show";
    case DASHBOARD_REFRESH:
        return "refresh";
    case DASHBOARD_MASTER_REFRESH:
        return "master_refresh";
    case DASHBOARD_CREATE:
        return "create";        
    default:
      return state;

  }
}
