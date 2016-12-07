/**
 * Created by jlmayorga on 3/18/16.
 */
import {Component} from "@angular/core";
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl, Control} from "@angular/common";
import {AbstractNode} from "./abstract-node";

function promptValidator(control:Control):{ [s:string]:boolean } {
  if (!control.value.match(this.pattern)) {
    return {invalidPromptInput: true};
  }
}

@Component({
  selector: 'workflow-prompt-node',
  templateUrl: '/src/core/components/workflow/nodes/prompt-node.component.html',
  directives: [FORM_DIRECTIVES]

})
export class PromptNodeComponent extends AbstractNode {
  promptInput:AbstractControl;
  form:ControlGroup;
  pattern = /^456/;

  constructor(fb:FormBuilder) {
    super();
    this.form = fb.group({
      'promptInput': ['', Validators.compose([Validators.required, promptValidator.bind(this)])]
    });

    this.promptInput = this.form.controls['promptInput'];
  }
}
