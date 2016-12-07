import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'toggle-button',
  templateUrl: '/src/core/components/toggleButton/toggle-button.component.html'
})

export class ToggleButtonComponent {

  @Output()
  private toggle:EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  private type:string;

  @Input()
  private on:string = "+";

  @Input()
  private off:string = "-";

  @Input()
  isOn:any = true;
  width:number = 46;

  isToggled:boolean;
  constructor(){}

  ngOnInit(){
    if(this.isOn === "false"){
      this.isToggled = true
    }else if(this.isOn === "true") {
      this.isToggled = false;
    }else{
      this.isToggled = this.isOn;
    }
  }

  onClick(){
    this.isToggled = !this.isToggled;
    this.toggle.emit(this.isToggled);
  }

}
