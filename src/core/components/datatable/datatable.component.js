System.register(["@angular/core", 'primeng/primeng'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, primeng_1, primeng_2;
    var Datatable;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
                primeng_2 = primeng_1_1;
            }],
        execute: function() {
            Datatable = (function () {
                function Datatable() {
                    this.clickEmitter = new core_1.EventEmitter();
                }
                Datatable.prototype.ngOnInit = function () {
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], Datatable.prototype, "columns", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], Datatable.prototype, "columnData", void 0);
                Datatable = __decorate([
                    core_1.Component({
                        selector: 'data-table',
                        templateUrl: '/src/core/components/datatable/datatable.component.html',
                        directives: [primeng_1.DataTable, primeng_2.Column]
                    }), 
                    __metadata('design:paramtypes', [])
                ], Datatable);
                return Datatable;
            }());
            exports_1("Datatable", Datatable);
        }
    }
});
//# sourceMappingURL=datatable.component.js.map