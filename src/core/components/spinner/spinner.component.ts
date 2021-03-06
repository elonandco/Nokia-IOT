import {Component, Input} from '@angular/core';
/**
 * Created by jlmayorga on 4/18/16.
 */

@Component({
  selector: 'spinner-component',
  templateUrl: '/src/core/components/spinner/spinner.component.html'
})

export class SpinnerComponent {
  @Input()
  private header:string = 'Loading';
  @Input()
  private message:string = 'Please wait while the application is loading...';
  @Input()
  private iconClass:string = 'ko-user-admin';

}
