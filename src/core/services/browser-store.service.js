System.register(['@angular/core', '@ngrx/store'], function(exports_1, context_1) {
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
    var core_1, store_1;
    var BrowserStoreService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            }],
        execute: function() {
            BrowserStoreService = (function () {
                function BrowserStoreService(store) {
                    var _this = this;
                    this.store = store;
                    this.store = store;
                    this.userPrefObs = this.store.select('UserPreferencesReducer');
                    this.userPrefObs.subscribe(function (data) {
                        if (data && data.quickLinksloaded && data.widgetsLoaded) {
                            _this.save(data);
                        }
                    }, function (error) {
                    });
                }
                BrowserStoreService.prototype.save = function (data) {
                    var widgetArray = [], wObj;
                    _.each(data.widgets, function (widget) {
                        wObj = {};
                        wObj.isHidden = widget.isHidden;
                        wObj.settings = widget.settings;
                        wObj.name = widget.name;
                        widgetArray.push(wObj);
                    });
                    var quickLinkArray = [], qlObj;
                    _.each(data.quickLinks, function (quickLink) {
                        qlObj = {};
                        qlObj.isHidden = quickLink.isHidden;
                        qlObj.name = quickLink.name;
                        quickLinkArray.push(qlObj);
                    });
                    var saveObj = {
                        widgets: widgetArray,
                        quickLinks: quickLinkArray,
                        widgetOrder: data.widgetOrder
                    };
                    this.setLocalStorage('userSettings', saveObj);
                    console.log('saving.... ' + saveObj);
                };
                BrowserStoreService.prototype.setLocalStorage = function (name, data, stringify) {
                    if (stringify === void 0) { stringify = true; }
                    if (stringify) {
                        data = JSON.stringify(data);
                    }
                    localStorage.setItem(name, data);
                };
                BrowserStoreService.prototype.getLocalStorage = function (name, parseJSON) {
                    if (parseJSON === void 0) { parseJSON = true; }
                    if (parseJSON) {
                        return JSON.parse(localStorage.getItem(name));
                    }
                    return localStorage.getItem(name);
                };
                BrowserStoreService.prototype.onLogOut = function () {
                };
                BrowserStoreService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [store_1.Store])
                ], BrowserStoreService);
                return BrowserStoreService;
            }());
            exports_1("BrowserStoreService", BrowserStoreService);
        }
    }
});
//# sourceMappingURL=browser-store.service.js.map