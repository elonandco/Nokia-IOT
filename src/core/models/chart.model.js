System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ChartModel;
    return {
        setters:[],
        execute: function() {
            ChartModel = (function () {
                function ChartModel() {
                    this.NOKIADEFAULTCOLORS = [
                        '#0B6DAF',
                        '#6B489D',
                        '#33B883',
                        '#808080',
                        '#D9E783',
                        '#00A1CC',
                        '#A691C4',
                        '#444444',
                        '#FABF78',
                        '#E0E0E0',
                        '#F5837C',
                        '#FDD835',
                        '#E10078',
                        '#FFE069',
                        '#00737D',
                        '#C30041',
                        '#B3B3B3',
                        '#E799B3',
                        '#00BCD4',
                        '#000000',
                        '#CCCCCC',
                    ];
                }
                ChartModel.prototype.seriesColors = function (dataPoints) {
                    if (dataPoints === 2) {
                        return [this.NOKIADEFAULTCOLORS[0], this.NOKIADEFAULTCOLORS[this.NOKIADEFAULTCOLORS.length - 1]];
                    }
                    return this.NOKIADEFAULTCOLORS;
                };
                ;
                return ChartModel;
            }());
            exports_1("ChartModel", ChartModel);
        }
    }
});
//# sourceMappingURL=chart.model.js.map