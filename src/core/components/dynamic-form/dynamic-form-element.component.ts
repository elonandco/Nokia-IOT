import {Component, Input} from '@angular/core';
import {ControlGroup} from '@angular/common';
import {BaseFormElement, FormElementValidation} from './model/form-elements';
import {Calendar} from 'primeng/primeng';
import {TooltipDirective} from "../tooltip/tooltip.directive";
import {SearchPipe} from "/src/core/components/dynamic-form/dynamic-form-pipe.component";

@Component({
  selector: 'df-element',
  pipes:[SearchPipe],
  templateUrl: '/src/core/components/dynamic-form/dynamic-form-element.component.html',
  directives: [Calendar, TooltipDirective]
})
export class DynamicFormElementComponent {
  @Input() formElement:BaseFormElement<any>;
  @Input() form:ControlGroup;

  private isValid() {
    return this.form.controls[this.formElement.key].valid || !this.form.controls[this.formElement.key].touched;
  }

  get errorList() {
    let errorList = [];
    //save for later use
    let control = this.form.controls[this.formElement.key];
    let this_input = document.getElementById(this.formElement.key);
    let files_exist = this_input ? (this_input.files ? this_input.files.length : true) : true;
    let files_uploaded = files_exist || control.dirty;

    //validate field
    if(this_input){
        let focusedElem = document.activeElement;
        if(this_input !== focusedElem && control.value.length && files_uploaded) control.updateValue(control.value);
    }
    
    if (!control.valid && control.touched && files_uploaded) {
      let errors = control.errors;
      for (let error in errors) {
        if (errors.hasOwnProperty(error)) {
          this.formElement.validations.forEach((validation:FormElementValidation) => {
            if (validation.type == error) {
              errorList.push(validation.errorMessage);
            }
          });
        }
      }
    }
    return errorList;
  }

  //this decides if an aterick is needed on a field
  private ifRequired(validations){
    let i = 0;
    let isRequired = false;
    if(validations){
      for(i;i<validations.length;i++){
        if(validations[i]["type"] === "required"){
          isRequired = true;
          break;
        }
      }
    }
    return isRequired;
  }

  private findKey(target:object){
    let key = ""
    if(target.classList.contains('hasDatepicker')){
      key = target.parentNode.parentNode.id;
    }else{
      key = target.id
    }
    return key;
  }


  private handleFormButton(event:any){
    console.log(event)
  }

  private updateSubStatus(change){
    let subControl = this.data[_.map(this.data, 'key').indexOf(this.findKey(change.target))].subControl;
    if(change.value.length){
      this.data[_.map(this.data, 'key').indexOf(subControl.key)].status = subControl.subStatus;
    }
  }
}

