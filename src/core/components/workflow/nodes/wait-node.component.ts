/**
 * Created by jlmayorga on 3/18/16.
 */
import {Component, Input} from '@angular/core';

@Component({
  selector: 'workflow-wait-node',
  templateUrl: '/src/core/components/workflow/nodes/wait-node.component.html'

})
export class WaitNodeComponent {
  @Input()
  content:any;
  private data;
  
  private iconClass:string = 'ko-user-admin';
  private header:string = 'Loading';
  private message:string = '';
  
  ngOnInit():any {
    if (this.content && this.content.data) {
      this.data = JSON.parse(this.content.data);
    }
  }
}
