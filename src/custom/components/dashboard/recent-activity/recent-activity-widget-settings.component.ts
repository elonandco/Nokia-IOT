import {Component} from "@angular/core";
import {RecentActivityWidgetContentComponent} from "./recent-activity-widget-content.component";
import {WidgetSettingsComponent} from "../../../../core/components/dashboard/widgets/widget-settings.component";

@Component({
  selector: 'widget-settings',
  directives: [RecentActivityWidgetContentComponent, RecentActivityWidgetSettingsComponent],
  templateUrl: '/src/custom/components/dashboard/recent-activity/recent-activity-widget-settings.component.html'
})

export class RecentActivityWidgetSettingsComponent extends WidgetSettingsComponent {
  title:string = 'Recent Activity Setting';
  
  constructor() {
    super();
  }
  showDetail():void {
  }

}
