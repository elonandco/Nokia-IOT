/**
 * Created by jlmayorga on 4/5/16.
 */
export class WorkflowExecution {
  id:string;
  attributes:string;
  name:string;
  locale:string;
  channel:string;
  subscriberId:string;
  executionId:string;
  breadcrumbs:boolean;
  status:number;
  step:WorkflowStep;
  data:Object;
  soaTraceId:string;
  signal:WorkflowSignal;
  event:any;
}

export class WorkflowStep {
  id:string;
  template:string;
  name:string;
  displayName:string;
  done:boolean;
  content:any;
  forceReload:boolean;
  responseRequired:boolean;
  data:string;
  validSignals:Array<WorkflowSignal>;
  breadcrumbs:Array<WorkflowStepInfo>;
}

export class WorkflowSignal {
  name:string;
  displayName:string;
  stepId:string;
  data:string;
}

export class WorkflowStepInfo {
  id:string;
  name:string;
  displayName:string;
}

