import {Component, Input} from "@angular/core";
import {Router} from "@angular/router-deprecated";
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'user-link',
  template: `
        <li *ngIf="!isHidden" class="user-link" (click)="gotoAddUser()">
            <i class="ko-user"></i><span>Add User</span>
        </li>
    `
})

export class UserLinkComponent {
  @Input() isHidden:boolean;
  type:string = 'User';
  userPrefObs:Observable<any>;

  constructor(private _router:Router,
              private _store:Store<any>) {

    this._store = _store;

    this.userPrefObs = this._store.select('UserPreferencesReducer');
    this.userPrefObs.subscribe(
        data=>{
        if(data.quickLinks){
        }
      },
        error=>{

      }

    );

  }




  private gotoAddUser() {
    this._router.navigate(['User']);
  }
}
