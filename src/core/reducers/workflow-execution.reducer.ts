import {Reducer, Action} from '@ngrx/store';
import {WorkflowExecution} from '../components/workflow/models/workflow-execution';

export const WF_EXEC_ACTION_ADD_OR_UPDATE = 'WF_EXEC_ACTION_ADD_OR_UPDATE';
export const WF_EXEC_COMPLETE = 'WF_EXEC_COMPLETE';
export const WorkflowExecutionReducer:Reducer<Array<WorkflowExecution>> = (state = [], action:Action)=> {
    switch (action.type) {
      case WF_EXEC_ACTION_ADD_OR_UPDATE:
      {
        // If there is a workflow with the same ID remove it
        let filteredArray:Array<WorkflowExecution> = state.filter((wfExec:WorkflowExecution)=> {
          return wfExec.id != action.payload.id;
        });

        // Add the new workflow state
        filteredArray.push(Object.assign({}, action.payload));

        return filteredArray;
      }
      case WF_EXEC_COMPLETE:
      {
        // Remove the workflow execution
        return state.filter((wfExec:WorkflowExecution)=> wfExec.id != action.payload.id);
      }
      default:
      {
        return state;
      }
    }
  }
  ;
