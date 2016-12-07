System.register(['@angular/core', '@angular/platform-browser/src/browser/browser_adapter'], function(exports_1, context_1) {
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
    var core_1, browser_adapter_1;
    var PREFIX_DIRECTIVE, PREFIX_ELEMENT, WIDE, NARROW, TooltipDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_adapter_1_1) {
                browser_adapter_1 = browser_adapter_1_1;
            }],
        execute: function() {
            PREFIX_DIRECTIVE = 'mt-tooltip-';
            PREFIX_ELEMENT = 'tt-';
            WIDE = 'wide';
            NARROW = 'narrow';
            TooltipDirective = (function () {
                function TooltipDirective(dom, el) {
                    this.dom = dom;
                    this.el = el;
                    this.tooltipPosition = 'top'; // Value: top (default), bottom, left or right
                    this.tooltipWordWrap = false; // Value: false (default) or true
                    this.tooltipWidth = 'none'; // Value: none (default), wide or narrow
                    this.tooltipEvent = 'hover'; // Value: hover (default) or click
                    this.isTooltipActive = false;
                    this.directiveId = this.generateUniqueId(PREFIX_DIRECTIVE);
                }
                TooltipDirective.prototype.ngOnInit = function () {
                    // Add unique ID to the directive element
                    this.el.nativeElement.id = this.directiveId;
                    // Determine the width of the tooltip when tooltipWordWrap is equal to true
                    this.setTooltipWordWrapWidth();
                };
                // EVENTS HANDLING
                TooltipDirective.prototype.onclick = function ($event) {
                    if (this.tooltipEvent === 'click') {
                        if (!this.isTooltipActive) {
                            this.render();
                        }
                        else {
                            this.hide();
                        }
                        this.isTooltipActive = !this.isTooltipActive;
                    }
                };
                TooltipDirective.prototype.onMouseEnter = function ($event) {
                    if (this.tooltipEvent === 'hover') {
                        this.render();
                    }
                };
                TooltipDirective.prototype.onMouseOut = function ($event) {
                    if (this.tooltipEvent === 'hover') {
                        this.hide();
                    }
                };
                // PUBLIC METHODS
                TooltipDirective.prototype.hide = function () {
                    this.dom.remove(this.tooltipElement);
                };
                TooltipDirective.prototype.render = function () {
                    this.createTooltipElement();
                    this.appendTooltipElementToBody();
                    this.getBoundingDirectiveRect();
                    this.renderToDirectivePosition();
                };
                // PRIVATE METHODS
                // Append the tooltipElement to 'body'
                // So it can get the actual dimension of the tooltip later
                TooltipDirective.prototype.appendTooltipElementToBody = function () {
                    var dom = this.dom.query('body');
                    dom.appendChild(this.tooltipElement);
                };
                // Create a hidden element and
                // set it to the tooltipElement property
                TooltipDirective.prototype.createTooltipElement = function () {
                    this.tooltipId = PREFIX_ELEMENT + this.directiveId;
                    // adding tooltip element
                    this.tooltipElement = this.dom.createElement('div');
                    this.tooltipElement.setAttribute('id', this.tooltipId);
                    this.tooltipElement.setAttribute('class', this.tooltipElement.className + ' ' + 'popover');
                    // adding tooltip arrow
                    var tooltipElementArrow = this.dom.createElement('div');
                    tooltipElementArrow.setAttribute('class', 'arrow');
                    // adding tooltip content
                    var tooltipElementContent = this.dom.createElement('div');
                    tooltipElementContent.setAttribute('class', 'popover-content');
                    tooltipElementContent.innerHTML = this.tooltip;
                    // append all to tooltip element
                    this.tooltipElement.appendChild(tooltipElementArrow);
                    this.tooltipElement.appendChild(tooltipElementContent);
                    // styles
                    this.dom.setStyle(this.tooltipElement, 'visibility', 'hidden');
                    if (this.tooltipWordWrap) {
                        this.dom.setStyle(this.tooltipElement, 'width', this.tooltipElementWidth + 'px');
                    }
                };
                TooltipDirective.prototype.calculateTooltipElementLeft = function (position) {
                    switch (position) {
                        case 'right':
                            return this.directiveRect.left + this.directiveRect.offsetWidth + 8; // 8px adjust for the tip
                        case 'left':
                            return this.directiveRect.left - this.dom.query('#' + this.tooltipId).offsetWidth - 8; // 8px adjust for the tip
                        default:
                            // directive's left + half directive's width - half tooltip's width
                            return this.directiveRect.left + this.directiveRect.offsetWidth / 2 - this.getTooltipElementWidth() / 2;
                    }
                };
                TooltipDirective.prototype.calculateTooltipElementTop = function (position) {
                    switch (position) {
                        case 'bottom':
                            return this.directiveRect.top + this.directiveRect.offsetHeight + 8; // 8px adjust for the tip
                        case 'right':
                        case 'left':
                            return this.directiveRect.top - this.dom.query('#' + this.tooltipId).offsetHeight / 2 + (this.directiveRect.offsetHeight / 2);
                        default:
                            return this.directiveRect.top - this.dom.query('#' + this.tooltipId).offsetHeight - 8; // 8px adjust for the tip
                    }
                };
                TooltipDirective.prototype.generateUniqueId = function (prefix) {
                    if (prefix === void 0) { prefix = ""; }
                    return (prefix + (10000 + (Math.floor(Math.random() * 100000))));
                };
                // Get the actual dimension of the tooltip
                TooltipDirective.prototype.getBoundingDirectiveRect = function () {
                    var domDirective = this.dom.query('#' + this.directiveId);
                    this.directiveRect = domDirective.getBoundingClientRect();
                    this.directiveRect.offsetWidth = domDirective.offsetWidth;
                    this.directiveRect.offsetHeight = domDirective.offsetHeight;
                };
                TooltipDirective.prototype.getTooltipElementWidth = function () {
                    if (!this.tooltipWordWrap) {
                        // auto width
                        this.tooltipElementWidth = this.tooltipElement.offsetWidth;
                    }
                    return this.tooltipElementWidth;
                };
                TooltipDirective.prototype.renderOnBottom = function () {
                    this.setStyleY('bottom');
                };
                TooltipDirective.prototype.renderOnLeft = function () {
                    this.setStyleX('left');
                };
                TooltipDirective.prototype.renderOnRight = function () {
                    this.setStyleX('right');
                };
                TooltipDirective.prototype.renderOnTop = function () {
                    this.setStyleY('top');
                };
                TooltipDirective.prototype.renderToDirectivePosition = function () {
                    switch (this.tooltipPosition) {
                        case 'bottom': {
                            this.renderOnBottom();
                            break;
                        }
                        case 'right': {
                            this.renderOnRight();
                            break;
                        }
                        case 'left': {
                            this.renderOnLeft();
                            break;
                        }
                        default: {
                            this.renderOnTop();
                            break;
                        }
                    }
                };
                // position: 'left' or 'right'
                TooltipDirective.prototype.setStyleX = function (position) {
                    this.dom.addClass(this.tooltipElement, position);
                    this.dom.setStyle(this.tooltipElement, 'left', this.calculateTooltipElementLeft(position) + 'px');
                    this.dom.setStyle(this.tooltipElement, 'top', this.calculateTooltipElementTop(position) + 'px');
                    this.dom.setStyle(this.tooltipElement, 'visibility', 'visible');
                };
                // position: 'top' or 'bottom'
                TooltipDirective.prototype.setStyleY = function (position) {
                    this.dom.addClass(this.tooltipElement, position);
                    this.dom.setStyle(this.tooltipElement, 'left', this.calculateTooltipElementLeft(position) + 'px');
                    this.dom.setStyle(this.tooltipElement, 'top', this.calculateTooltipElementTop(position) + 'px');
                    this.dom.setStyle(this.tooltipElement, 'visibility', 'visible');
                };
                // tooltipElementWidth will only be set when tooltipWordWrap is true
                TooltipDirective.prototype.setTooltipWordWrapWidth = function () {
                    if (this.tooltipWordWrap) {
                        switch (this.tooltipWidth) {
                            case WIDE: {
                                this.tooltipElementWidth = 250;
                                break;
                            }
                            case NARROW: {
                                this.tooltipElementWidth = 100;
                                break;
                            }
                            default:
                                this.tooltipElementWidth = 150;
                                break;
                        }
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], TooltipDirective.prototype, "tooltip", void 0);
                __decorate([
                    // the text of the tooltip
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], TooltipDirective.prototype, "tooltipPosition", void 0);
                __decorate([
                    // Value: top (default), bottom, left or right
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], TooltipDirective.prototype, "tooltipWordWrap", void 0);
                __decorate([
                    // Value: false (default) or true
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], TooltipDirective.prototype, "tooltipWidth", void 0);
                __decorate([
                    // Value: none (default), wide or narrow
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], TooltipDirective.prototype, "tooltipEvent", void 0);
                __decorate([
                    core_1.HostListener('click', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], TooltipDirective.prototype, "onclick", null);
                __decorate([
                    core_1.HostListener('mouseenter', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], TooltipDirective.prototype, "onMouseEnter", null);
                __decorate([
                    core_1.HostListener('mouseout', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], TooltipDirective.prototype, "onMouseOut", null);
                TooltipDirective = __decorate([
                    core_1.Directive({
                        selector: '[tooltip]',
                        providers: [browser_adapter_1.BrowserDomAdapter]
                    }), 
                    __metadata('design:paramtypes', [browser_adapter_1.BrowserDomAdapter, core_1.ElementRef])
                ], TooltipDirective);
                return TooltipDirective;
            }());
            exports_1("TooltipDirective", TooltipDirective);
        }
    }
});
//# sourceMappingURL=tooltip.directive.js.map