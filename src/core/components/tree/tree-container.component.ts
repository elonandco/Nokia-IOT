import {Component, Input, Output, EventEmitter, OnChanges, SimpleChange} from '@angular/core';
import {TreeComponent} from './tree.component';
import {TreeNode} from './tree-node.model';

@Component({
  selector: 'tree-container',
  directives: [TreeComponent],
  template: `
  <div class="tree">
   <tree [node]="node" (handleNodeChecked)="handleGroupChecked($event)" ></tree>
  </div>
`
})

export class TreeContainerComponent implements OnChanges {
  currentGroupSelected:string = "";
  node:Array<TreeNode> = [];

  @Input() treeJson:string;
  @Output() handleClick = new EventEmitter<any>();

  constructor() {
  }

  ngOnChanges(changes:{[propKey:string]:SimpleChange}) {
    this.node = this.parseTreeJson(this.treeJson);
  }

  handleClickEvent(event) {
    this.handleClick.emit(event);
  }

  handleGroupChecked(event) {
    this.currentGroupSelected = event.id;
    this.updateTreeCheckStatus(event.id);
    this.handleClickEvent(event);
  }

  /**
   * Get an array of all checked node IDs from the tree model
   * @returns { Array<any> }
   */
  getAllCheckedNodes():Array<TreeNode> {
    return this.getAllCheckedNodesRecursive(this.node);
  }

  expandAll():void {
    this.expandAllRecursive(this.node);
  }

  // PRIVATE METHODS

  /**
   * Expand all the tree nodes
   * @param source An array containing the model of the tree
   */
  private expandAllRecursive(source:Array<TreeNode>):void {
    source.forEach(
      node => {
        node.expanded = true;
        if (node.subnodes.length > 0) {
          this.expandAllRecursive(node.subnodes);
        }
      }
    );
  }

  /**
   * Get an array of all checked node IDs from the tree model
   * @param source An array containing the model of the tree
   * @param result An empty array for the resulted tree IDs
   * @returns {result}
   */
  private getAllCheckedNodesRecursive(source:Array<TreeNode>, result:Array<TreeNode> = []):Array<TreeNode> {
    source.forEach(
      (node:any) => {
        if (node.checked) {
          result.push(node.id);
        }
        if (node.subnodes.length > 0) {
          this.getAllCheckedNodesRecursive(node.subnodes, result);
        }
      }
    );
    return result;
  }

  /**
   * Create the tree model which is used in the tree component from a provided json data
   * @param json The tree JSON
   * @returns {target}
   */
  private parseTreeJson(json):Array<TreeNode> {
    // start parsing only if there is at least one group
    if (json.groups && json.groups.length > 0) {
      return this.parseTreeJsonRecursive(json.groups);
    }
    else {
      // return a empty array even if invalid json
      return [];
    }
  }

  /**
   * Create the tree model which is used in the tree component from a provided json data
   * @param source An array containing the tree in JSON format
   * @param target An empty TreeNode array for the resulted tree model
   * @param depth (optional) A number represents the node depth in the tree
   * @returns {target}
   */
  private parseTreeJsonRecursive(source:Array<TreeNode>, target:Array<TreeNode> = [], depth:number = 0):Array<TreeNode> {
    depth++;
    source.forEach(
      (d: any) => {
        let menuGroup = new TreeNode(d.id, d.displayName);
        menuGroup.name = d.displayName;
        menuGroup.fullName = d.fullName;
        menuGroup.enterprise = d.fullName.split(".").slice(0,3).join(".");
        if (d.attributes != undefined){
        	menuGroup.checked = d.attributes.checked;
        }
        
        if (depth < 2){
        	menuGroup.expanded = true;
        }
        menuGroup.level = depth;
        if (d.groups.length > 0) {
          target.push(menuGroup);
          this.parseTreeJsonRecursive(d.groups, menuGroup.subnodes, depth);
        } else {
          menuGroup.isLeaf = true;
          target.push(menuGroup);
        }
      }
    );
    return target;
  }

  private updateTreeCheckStatus(nodeCheckedId):void {
    this.updateTreeCheckStatusRecursive(this.node, nodeCheckedId, false);
  }

  private updateTreeCheckStatusRecursive(node, nodeCheckedId, isParentChecked):void {
    node.forEach(
      d => {
        if (d.id === nodeCheckedId || isParentChecked) {
          d.checked = true;
          if (d.subnodes.length > 0) {
            this.updateTreeCheckStatusRecursive(d.subnodes, nodeCheckedId, true);
          }
        } else {
          d.checked = false;
          if (d.subnodes.length > 0) {
            this.updateTreeCheckStatusRecursive(d.subnodes, nodeCheckedId, false);
          }
        }
      }
    );
  }
}
