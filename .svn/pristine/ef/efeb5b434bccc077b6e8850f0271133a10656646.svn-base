/**
 * Created by jlmayorga on 3/18/16.
 */
import {Component, OnChanges, SimpleChange} from '@angular/core';
import {AbstractNode} from './abstract-node';

@Component({
  selector: 'workflow-selector-node',
  templateUrl: '/src/core/components/workflow/nodes/selector-node.component.html'

})
export class SelectorNodeComponent extends AbstractNode implements OnChanges {

  private options:Array<{name:string, value:string}>;
  private variableName:string;
  private selectedValue:any;
  private selectionType:string;

  ngOnChanges(changes:{[key:string]:SimpleChange}):any {
    super.ngOnChanges(changes);
    if (this.content) {
      let availableItems = this.content.availableItems.split(',');
      let displayItems = this.content.displayItems.split(',');
      this.variableName = this.content.selectedItemsVar;
      if (availableItems.length == displayItems.length) {
        this.options = availableItems.map((value, index)=> {
          let option = {name: '', value: ''};
          option.name = displayItems[index];
          option.value = value;
          return option;
        });
      }
      this.selectionType = this.content.selectionType;
    }
  }

  private setSelectedValue(value) {
    this.selectedValue = value;
  }

  private handleSignal(signalName:string) {
    if (this.selectedValue) {
      let payload = {};
      payload[this.variableName] = this.selectedValue;
      this.sendSignal(signalName, payload);
    }
  }

}
