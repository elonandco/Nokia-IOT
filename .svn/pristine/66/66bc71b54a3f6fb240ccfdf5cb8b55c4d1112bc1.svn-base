// login.ts
import {Component, OnActivate} from '@angular/core';
import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, NgIf} from '@angular/common';
import {Router} from '@angular/router-deprecated';
import {AuthenticationService} from '../../services/authentication.service'
import {TooltipDirective} from "../tooltip/tooltip.directive";
import {Store} from '@ngrx/store';
import {DASHBOARD_CREATE} from "../../reducers/dashboard.reducer";

@Component({
  selector: 'login',
  directives: [FORM_DIRECTIVES, NgIf, TooltipDirective],
  templateUrl: '/src/core/components/auth/login.component.html'
})

export class LoginComponent implements OnActivate {	
  private _loginForm:ControlGroup;
  private _error:boolean = false;

  isRoot:boolean = true;
  isTooltip: boolean = false;

  constructor(private _fb:FormBuilder,
              private _authService:AuthenticationService,
              private _router:Router,
              private _store:Store<any>) {
    this._loginForm = _fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  doLogin() {
    this._authService.login(this._loginForm.value.username, this._loginForm.value.password, this.isRoot).subscribe(
      data => {
    	this._store.dispatch({type:DASHBOARD_CREATE});
        let link = ['Dashboard'];
        this._router.navigate(link);
      },
      err => {
        this._error = true;
      }
    );
  }

  handleRadioButtonClick(value:string) {
    value === 'root' ? this.isRoot = true : this.isRoot = false;
  }

  toggleTooltip() {
    return this.isTooltip = !this.isTooltip;
  }
  
  routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction):void{
	//TODO: Performance any action on login touter
  }


}
