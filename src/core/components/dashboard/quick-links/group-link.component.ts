import {Component,Input} from "@angular/core";
import {Router} from "@angular/router-deprecated";

@Component({
  selector: 'group-link',
  template: `
        <li *ngIf="!isHidden" class="user-group-link" (click)="gotoAddGroup()">
            <i class="ko-user-group"></i><span>Add Group</span>
        </li>
    `
})

export class GroupLinkComponent {

  @Input() isHidden:boolean;
  type:string = 'Group';

  constructor(private _router:Router) {
  }

  private gotoAddGroup() {
    this._router.navigate(['UserGroup']);
  }
}
