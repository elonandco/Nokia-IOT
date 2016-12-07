import {Injectable} from '@angular/core'
import {Observable} from 'rxjs/rx'
import 'rxjs/add/operator/map'
import {Store} from '@ngrx/store'

@Injectable()
export class UsersService {

  constructor(private _store:Store<any>) {}

  getUsers() {
    return _.toPairs(this._store.value.WorkflowContextReducer.globalContext["usersRoleCountJSON"][0]);
  }

}
