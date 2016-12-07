import {Reducer, Action} from '@ngrx/store';
import {DSOModel} from '../models/dso.model';

export const DSO_MODEL_ACTION_UPDATE = 'DSO_MODEL_ACTION_UPDATE';
export const DSO_MODEL_ACTION_ADD_OR_UPDATE_ACCOUNT = 'DSO_MODEL_ACTION_ADD_OR_UPDATE_ACCOUNT';
export const DSO_MODEL_ACTION_ADD_OR_UPDATE_DOMAIN = 'DSO_MODEL_ACTION_ADD_OR_UPDATE_DOMAIN';
export const DSO_MODEL_ACTION_ADD_OR_UPDATE_SERVICE = 'DSO_MODEL_ACTION_ADD_OR_UPDATE_SERVICE';
export const DSO_MODEL_ACTION_ADD_OR_UPDATE_OPERATION = 'DSO_MODEL_ACTION_ADD_OR_UPDATE_OPERATION';

export const DSOModelReducer:Reducer<DSOModel> = (state:DSOModel, action:Action)=> {
  switch (action.type) {
    case DSO_MODEL_ACTION_ADD_OR_UPDATE_ACCOUNT:
    {
      return Object.assign({}, state, action.payload);
    }
    case DSO_MODEL_ACTION_ADD_OR_UPDATE_DOMAIN:
    {
      let payload = action.payload;
      let newState:DSOModel = Object.assign({}, state);
      if (!newState.domains) {
        newState.domains = {};
        newState.domains.domain = payload;
      } else {
        //TODO: merge old state with new state
      }
      return newState;
    }
    case DSO_MODEL_ACTION_ADD_OR_UPDATE_SERVICE:
    {
      let newState:DSOModel = Object.assign({}, state);
      let payload = action.payload;
      newState.domains.domain = newState.domains.domain.map((domain)=> {
        //TODO: merge old state with new state
        domain.services = {};
        domain.services.service = payload.filter((service)=> {
          return domain.name === service.domain.name;
        });
        return domain;
      });

      return newState;
    }
    case DSO_MODEL_ACTION_ADD_OR_UPDATE_OPERATION:
    {
      let newState:DSOModel = Object.assign({}, state);
      let payload = action.payload;
      newState.domains.domain = newState.domains.domain.map((domain)=> {
        domain.services.service.map((service)=> {
          //TODO: merge old state with new state
          service.operations = {};
          service.operations.operation = payload.filter((operation)=> {
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
      return Object.assign({}, DSOModel, action.payload);
    }
    default:
    {
      return state;
    }
  }
};
