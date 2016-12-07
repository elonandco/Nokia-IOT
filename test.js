(function(System, SystemJS) {System.register(["@angular/core", 'angular2-highcharts', 'highcharts/highcharts-3d', "../../../../core/components/dashboard/widgets/widget-content.component", '../../../../custom/components/dashboard/campaigns/campaign-widget-service', '@ngrx/store', "../../../../core/models/chart.model"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, angular2_highcharts_1, highcharts_3d_1, widget_content_component_1, campaign_widget_service_1, store_1, chart_model_1;
    var CampaignsWidgetContentComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular2_highcharts_1_1) {
                angular2_highcharts_1 = angular2_highcharts_1_1;
            },
            function (highcharts_3d_1_1) {
                highcharts_3d_1 = highcharts_3d_1_1;
            },
            function (widget_content_component_1_1) {
                widget_content_component_1 = widget_content_component_1_1;
            },
            function (campaign_widget_service_1_1) {
                campaign_widget_service_1 = campaign_widget_service_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (chart_model_1_1) {
                chart_model_1 = chart_model_1_1;
            }],
        execute: function() {
            highcharts_3d_1.default(angular2_highcharts_1.Highcharts);
            CampaignsWidgetContentComponent = (function (_super) {
                __extends(CampaignsWidgetContentComponent, _super);
                function CampaignsWidgetContentComponent(store, _campaignService) {
                    var _this = this;
                    _super.call(this);
                    this.store = store;
                    this._campaignService = _campaignService;
                    this.chartModel = new chart_model_1.ChartModel();
                    this._campaignService = _campaignService;
                    var userPreferences = this.store.select('UserPreferencesReducer');
                    if (userPreferences != undefined && userPreferences.widgets != undefined) {
                        this.updateSettings(userPreferences.widgets);
                    }
                    this.userPreferences.subscribe(function (data) {
                        _this.widget = _.find(data.widgets, function (widget) {
                            return widget.id === "Campaigns";
                        });
                    }, showDetail(), void {
                        console: .log('showDetail firmware detail'),
                        this: ._router.navigate(['EAP_IOT_VIEW_CAMPAIGNS'])
                    }, updateSettings(widgets, any), {
                        this: .widget = _.find(widgets, function (widget) {
                            return widget.id === "Campaigns";
                        }),
                        if: function () { }, this: .widget });
                    {
                        if (this.widget.settings && this.widget.settings.hasOwnProperty('displayType')) {
                            this.displayType = this.widget.settings.displayType;
                        }
                        if (this.widget.settings && this.widget.settings.hasOwnProperty('showCount')) {
                            this.showCount = this.widget.settings.showCount;
                        }
                    }
                }
                Object.defineProperty(CampaignsWidgetContentComponent.prototype, "data", {
                    set: function (data) {
                        if (data) {
                            this.initGraph(data);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                CampaignsWidgetContentComponent.prototype.initGraph = function (data) {
                    var all_campaigns = this._campaignService.getCampaign();
                    var campaigns = all_campaigns[_.map(all_campaigns, 'key').indexOf(this.displayType)];
                    var dates = campaigns.dates;
                    var timePeriod = campaigns.type;
                    var dataPoints = campaigns.numOfCampaigns;
                    this.options = {
                        title: {
                            text: '',
                            x: -20 //center
                        },
                        subtitle: {
                            text: '- Pass 6 ' + timePeriod,
                            align: 'left',
                            x: -10,
                            y: 0,
                            style: {
                                color: '#000',
                                fontSize: '14px'
                            }
                        },
                        xAxis: {
                            categories: dates,
                            labels: {
                                style: {
                                    color: '#000',
                                }
                            }
                        },
                        yAxis: {
                            className: 'y-axis-text',
                            title: {
                                text: 'No of Campaigns',
                                style: {
                                    color: '#000',
                                    fontSize: '14px'
                                },
                                x: -16
                            },
                            plotLines: [{
                                    value: 0,
                                    width: 1,
                                    color: '#808080'
                                }]
                        },
                        tooltip: {
                            valueSuffix: ''
                        },
                        series: [{
                                name: ' ',
                                data: dataPoints
                            }],
                        credits: {
                            enabled: false
                        }
                    };
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], CampaignsWidgetContentComponent.prototype, "data", null);
                CampaignsWidgetContentComponent = __decorate([
                    core_1.Component({
                        selector: "widget-content",
                        templateUrl: "/src/custom/components/dashboard/campaigns/campaign-widget-content.component.html",
                        styles: ["\n    .campaign-piechart{\n        position: relative;\n        width: 100%;\n        height: 90%;\n        float:left;\n    }\n  "],
                        directives: [angular2_highcharts_1.CHART_DIRECTIVES],
                        providers: [campaign_widget_service_1.CampaignService]
                    }), 
                    __metadata('design:paramtypes', [store_1.Store, campaign_widget_service_1.CampaignService])
                ], CampaignsWidgetContentComponent);
                return CampaignsWidgetContentComponent;
            }(widget_content_component_1.WidgetContentComponent));
            exports_1("CampaignsWidgetContentComponent", CampaignsWidgetContentComponent);
        }
    }
});
//# sourceMappingURL=campaign-widget-content.component.js.map
})(System, System);