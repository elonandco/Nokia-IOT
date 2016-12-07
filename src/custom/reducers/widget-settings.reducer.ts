import {Reducer, Action} from '@ngrx/store';

export const SETTINGS_SAVED = 'SETTINGS_SAVED';
export const SETTINGS_CANCELED = 'SETTINGS_CANCELED';
export const WidgetSettingsReducer:Reducer<string> = (state:string = "", action) => {
  switch (action.type) {
    case SETTINGS_SAVED:
      return action.payload;
    default:
      return state;

  }
}
