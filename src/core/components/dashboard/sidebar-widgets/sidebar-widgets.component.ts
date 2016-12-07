import {Component, Input} from "@angular/core";
import {Dragula, DragulaService} from 'ng2-dragula/ng2-dragula';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Rx';
import {ToggleButtonComponent} from "../../toggleButton/toggle-button.componet";
import {TOGGLE_QUICKLINK,TOGGLE_WIDGET_VIEW} from "../../../reducers/user-preferences.reducer";

@Component({
  selector: 'sidebar-widgets',
  templateUrl: '/src/core/components/dashboard/sidebar-widgets/sidebar-widgets.component.html',
  directives: [ToggleButtonComponent]
})

export class SidebarWidgetComponent {
  @Input() show : string;

  widgetObs: Observable<any>;
  private widgetArray:Array<any> = [];
  private linkArray:Array<any> = [];

  constructor( private store:Store<any>) {
    this.widgetObs = this.store.select('UserPreferencesReducer');
    this.widgetObs.subscribe(data => {
      if(data){
        if(data.widgets){
          this.widgetArray = [];
          for(var i= 0;i<data.widgets.length;i++){
            if(data.widgets[i].isHidden){
             this.widgetArray.push(data.widgets[i])
            }
          }
        }

        if(data.quickLinks){
          this.linkArray = [];
          for(var i= 0;i<data.quickLinks.length;i++){
            this.linkArray.push(data.quickLinks[i]);
          }
        }
      }

    });
  }

  onWidgetClick(evt:Event){
    var oldClass:String = evt.target.className,
      classArray:Array = oldClass.split(' ');
    classArray.push('closing');
    evt.target.className = classArray.join(' ');

    setTimeout( x =>{
      evt.target.className = oldClass
      this.store.dispatch({type: TOGGLE_WIDGET_VIEW, payload: {'widget': evt.target.id}});
    },250)
  }

  quickLinkToggle(link:any){
    link.isHidden = !link.isHidden;
    this.store.dispatch({type: TOGGLE_QUICKLINK,payload:link});
  }
}
