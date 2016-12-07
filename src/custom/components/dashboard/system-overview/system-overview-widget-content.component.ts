import {Component} from "@angular/core";
import {WidgetContentComponent} from "../../../../core/components/dashboard/widgets/widget-content.component";

@Component({
  selector: "widget-content",
  templateUrl: "/src/custom/components/dashboard/system-overview/system-overview-widget-content.component.html"
})

export class SystemOverviewWidgetContentComponent extends WidgetContentComponent {
  constructor() {
    super();
  }

}
