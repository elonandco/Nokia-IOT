
import {Component} from "@angular/core";
import {CHART_DIRECTIVES, Highcharts} from 'angular2-highcharts';
import Highcharts3d from 'highcharts/highcharts-3d';
import {WidgetContentComponent} from "../../../../core/components/dashboard/widgets/widget-content.component";
import {UsersService} from '../../../../custom/components/dashboard/users/users-widget-service'

Highcharts3d(Highcharts);

@Component({
    selector: "widget-content",
    templateUrl: "/src/custom/components/dashboard/users/users-widget-content.component.html",
    styles: [`
     :host {
        padding:0px;
        width: 300px;
        height:300px;
        display: block;
        clear:both;
        margin:5px;
    }  
  `],
  providers: [UsersService],
  directives: [CHART_DIRECTIVES]
})

export class UsersWidgetContentComponent extends WidgetContentComponent {
    constructor(_usersService: UsersService) {
        super();
        try {
            this.options = {
                chart: {
                    plotBackgroundColor: "transparent",
                    plotBorderWidth: 0,
                    plotShadow: false,
                    spacingBottom: 0,
                    spacingTop: 0,
                    spacingLeft: 0,
                    spacingRight: 0,
                    width: 320,
                    height:300,
                    backgroundColor:"none"
                },
                title: {
                    text: 'Users',
                    align: 'center',
                    verticalAlign: 'middle',
                    y: 0
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: true,
                            distance: 20,
                            style: {
                                fontWeight: 'bold',
                                color: '#3e3e3e'
                            }
                        },
                        startAngle: -90,
                        endAngle: 270,
                        center: ['50%', '50%']
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Browser share',
                    innerSize: '65%',
                    data: []
                }],
                credits: {
                  enabled: false
                },
            };
            this.options.series[0].data = _usersService.getUsers();
        } catch (e) {
          console.log("failed to load user widget data");
        }
    }
    options: Object;
}
