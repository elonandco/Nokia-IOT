import {Component} from "@angular/core";
import {SystemOverviewWidgetContentComponent} from "./system-overview-widget-content.component";
import {WidgetSettingsComponent} from "../../../../core/components/dashboard/widgets/widget-settings.component";
import {WidgetComponent} from "../../../../core/components/dashboard/widgets/widget.component";

@Component({
  selector: 'widget',
  directives: [SystemOverviewWidgetContentComponent, WidgetSettingsComponent],
  templateUrl: '/src/core/components/dashboard/widgets/widget.component.html'
})

export class SystemOverviewWidgetComponent extends WidgetComponent {

  title:string = 'System Overview';

  showDetail():void {
  }
}
