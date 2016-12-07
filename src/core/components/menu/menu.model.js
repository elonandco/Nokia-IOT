System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var DomainView, ServiceView, OperationView;
    return {
        setters:[],
        execute: function() {
            DomainView = (function () {
                function DomainView(services) {
                    this.services = services;
                    this.services = [];
                }
                return DomainView;
            }());
            exports_1("DomainView", DomainView);
            ServiceView = (function () {
                function ServiceView(operations) {
                    this.operations = operations;
                    this.expanded = false;
                    this.operations = [];
                }
                ServiceView.prototype.toggle = function () {
                    if (this.operations.length === 0) {
                        console.log('should navigate to route');
                    }
                    else {
                        this.expanded = !this.expanded;
                    }
                };
                return ServiceView;
            }());
            exports_1("ServiceView", ServiceView);
            OperationView = (function () {
                function OperationView() {
                }
                return OperationView;
            }());
            exports_1("OperationView", OperationView);
        }
    }
});
//# sourceMappingURL=menu.model.js.map