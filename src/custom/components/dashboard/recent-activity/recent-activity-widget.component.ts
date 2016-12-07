/**
 * Created by jlmayorga on 3/1/16.
 */

import {Component} from "@angular/core";
import {RecentActivityWidgetContentComponent} from "./recent-activity-widget-content.component";
import {RecentActivityWidgetSettingsComponent} from "./recent-activity-widget-settings.component";
import {WidgetComponent} from "../../../../core/components/dashboard/widgets/widget.component";

@Component({
  selector: 'widget',
  directives: [
    RecentActivityWidgetContentComponent,
    RecentActivityWidgetSettingsComponent
  ],
  templateUrl: '/src/core/components/dashboard/widgets/widget.component.html'
})

export class RecentActivityWidgetComponent extends WidgetComponent {
  title:string = 'Recent Activity';

  showDetail():void {
  }

}
