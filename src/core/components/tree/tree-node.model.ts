export class TreeNode {
  expanded: boolean = false;
  checked: boolean  = false;
  level: number = 0;
  isLeaf: boolean = false;
  enterprise: string = "";
  fullName: string = "";

  constructor(public id: string, public name: string, public subnodes?:Array<TreeNode>) {
    if (!subnodes) {
      this.subnodes = [];
    }
  }

  checkNode() {
    this.checked = !this.checked;
    this.checkNodeRecursive(this.checked);
  }

  toggle() {
    this.expanded = !this.expanded;
  }

  checkNodeRecursive(state:boolean) {
    this.subnodes.forEach(node => {
      node.checked = state;
      node.checkNodeRecursive(state);
    })
  }

}
