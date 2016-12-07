import {Reducer, Action} from '@ngrx/store';
import {WorkflowContext} from '../components/workflow/models/workflow-context';

export const WF_CTX_ACTION_UPDATE = 'WF_CTX_ACTION_UPDATE';
export const WorkflowContextReducer:Reducer<WorkflowContext> = (state = new WorkflowContext(), action:Action)=> {
    switch (action.type) {
      case WF_CTX_ACTION_UPDATE:
      {
        let payload = action.payload;
        //Clone the existing state and update with payload state, payload state will overwrite existing state if existing.
        let clonedGlobalCtx = Object.assign({}, state.globalContext, payload);
        let clonedWfSpecificCtx = Object.assign([], state.workflowSpecificContext, payload.workflowSpecificContext);

        // Create a new workflow context with the merged properties
        let newWfCtx = new WorkflowContext();
        newWfCtx.globalContext = clonedGlobalCtx;
        newWfCtx.workflowSpecificContext = clonedWfSpecificCtx;

        return newWfCtx;
      }
      default:
      {
        return state;
      }
    }
  }
  ;
