import {Component, Input, Output, EventEmitter} from '@angular/core';
import {TreeNode} from './tree-node.model';

@Component({
  selector: 'tree',
  directives: [TreeComponent],
  template: `
  <ul class="tree-container" >
    <li class="tree-node" *ngFor="let group of node">
      <div class="tree-content level-{{group.level}}" [ngClass]="{selected:group.checked}">
        <i *ngIf="!group.isLeaf" (click)="group.toggle()" class="tree-icon fa fa-caret-right" [ngClass]="{'fa-rotate-90': group.expanded}"></i>
        <i *ngIf="group.isLeaf" class="tree-indent"></i>
        <div class="tree-wholerow" (click)="handleNodeClick(group.id, group)">{{ group.name }}</div>
      </div>
      <div *ngIf="group.expanded">
         <tree [node]="group.subnodes"  (handleNodeChecked)="handleNodeCheckedEvent($event)"></tree>
      </div>
    </li>
  </ul>
`
})

export class TreeComponent {
  @Input() node: TreeNode;
  @Output() handleNodeChecked = new EventEmitter<any>();

  constructor() {
  }

  handleNodeClick(id, model) {
    // update the view model
    if (model) {
      model.checkNode();
    }
    this.handleNodeChecked.emit({ id: id, checked: model.checked, fullName: model.fullName, enterprise: model.enterprise });
  }

  handleNodeCheckedEvent(event) {
    this.handleNodeChecked.emit(event);
  }

}
