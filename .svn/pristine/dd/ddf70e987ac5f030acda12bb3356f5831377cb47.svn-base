import {Component} from "@angular/core";
import {Router} from "@angular/router-deprecated";

@Component({
  selector: 'device-link',
  template: `
        <li class="device-link" (click)="gotoAddDevice()">
            <i class="ko-smart-phone"></i><span>Add Device</span>
        </li> 
    `
})

export class DeviceQuickLinkComponent {
  constructor(private _router:Router) {
  }

  private gotoAddDevice() {
    this._router.navigate(['Device']);
  }
}
