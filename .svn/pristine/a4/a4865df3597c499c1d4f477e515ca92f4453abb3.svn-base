import { Directive, Input, HostListener, OnInit, ElementRef } from '@angular/core';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';

const PREFIX_DIRECTIVE = 'mt-tooltip-';
const PREFIX_ELEMENT = 'tt-';
const WIDE = 'wide';
const NARROW = 'narrow';

@Directive({
  selector: '[tooltip]',
  providers: [BrowserDomAdapter]
})
export class TooltipDirective implements OnInit{
  @Input()
  tooltip: string;                    // the text of the tooltip
  @Input()
  tooltipPosition: string = 'top';    // Value: top (default), bottom, left or right
  @Input()
  tooltipWordWrap: boolean = false;   // Value: false (default) or true
  @Input()
  tooltipWidth: string = 'none';      // Value: none (default), wide or narrow
  @Input()
  tooltipEvent: string = 'hover';     // Value: hover (default) or click

  directiveRect: any;                 // the size of an element and its position relative to the viewport. left, top, right and bottom. In additional, offsetWide and offsetHeight
  directiveId: string;
  tooltipElement: HTMLElement;        // the constructed tooltip element
  tooltipId: string;
  tooltipElementWidth : number;       // only applicable when tooltipWordWrap is equal to true
  isTooltipActive: boolean = false;

  constructor(private dom: BrowserDomAdapter, private el: ElementRef) {
    this.directiveId = this.generateUniqueId(PREFIX_DIRECTIVE)
  }

  ngOnInit() {
    // Add unique ID to the directive element
    this.el.nativeElement.id = this.directiveId;
    // Determine the width of the tooltip when tooltipWordWrap is equal to true
    this.setTooltipWordWrapWidth();
  }

  // EVENTS HANDLING

  @HostListener('click', ['$event'])
  onclick($event: any) {
    if (this.tooltipEvent === 'click') {
      if (!this.isTooltipActive) {
        this.render();
      } else {
        this.hide();
      }
      this.isTooltipActive = !this.isTooltipActive;
    }
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter($event: any) {
    if (this.tooltipEvent === 'hover') {
      this.render();
    }
  }

  @HostListener('mouseout', ['$event'])
  onMouseOut($event: any) {
    if (this.tooltipEvent === 'hover') {
      this.hide();
    }
  }

  // PUBLIC METHODS

  hide(): void {
    this.dom.remove(this.tooltipElement);
  }

  render(): void {
    this.createTooltipElement();
    this.appendTooltipElementToBody();
    this.getBoundingDirectiveRect();
    this.renderToDirectivePosition()
  }

  // PRIVATE METHODS

  // Append the tooltipElement to 'body'
  // So it can get the actual dimension of the tooltip later
  private appendTooltipElementToBody(): void {
    let dom = this.dom.query('body');
    dom.appendChild(this.tooltipElement);
  }

  // Create a hidden element and
  // set it to the tooltipElement property
  private createTooltipElement(): void {
    this.tooltipId =  PREFIX_ELEMENT+this.directiveId;
    // adding tooltip element
    this.tooltipElement = this.dom.createElement('div');
    this.tooltipElement.setAttribute('id', this.tooltipId);
    this.tooltipElement.setAttribute('class', this.tooltipElement.className + ' ' + 'popover');
    // adding tooltip arrow
    let tooltipElementArrow = this.dom.createElement('div');
    tooltipElementArrow.setAttribute('class', 'arrow');
    // adding tooltip content
    let tooltipElementContent = this.dom.createElement('div');
    tooltipElementContent.setAttribute('class', 'popover-content');
    tooltipElementContent.innerHTML = this.tooltip;
    // append all to tooltip element
    this.tooltipElement.appendChild(tooltipElementArrow);
    this.tooltipElement.appendChild(tooltipElementContent);
    // styles
    this.dom.setStyle(this.tooltipElement, 'visibility', 'hidden');
    if (this.tooltipWordWrap) {
      this.dom.setStyle(this.tooltipElement, 'width', this.tooltipElementWidth+'px');
    }
  }

  private calculateTooltipElementLeft(position: string): number {
    switch (position) {
      case 'right':
        return this.directiveRect.left + this.directiveRect.offsetWidth + 8; // 8px adjust for the tip
      case 'left' :
        return this.directiveRect.left - this.dom.query('#'+ this.tooltipId).offsetWidth - 8; // 8px adjust for the tip
      default: // 'top' or 'bottom'
        // directive's left + half directive's width - half tooltip's width
        return this.directiveRect.left + this.directiveRect.offsetWidth / 2 -  this.getTooltipElementWidth()  / 2 ;
    }
  }

  private calculateTooltipElementTop(position: string): number {
    switch (position) {
      case 'bottom':
        return this.directiveRect.top + this.directiveRect.offsetHeight + 8; // 8px adjust for the tip
      case 'right':
      case 'left':
        return this.directiveRect.top - this.dom.query('#'+ this.tooltipId).offsetHeight / 2 + (this.directiveRect.offsetHeight/2);
      default: // top, the 8px for adjusting the tip height
        return this.directiveRect.top - this.dom.query('#'+ this.tooltipId).offsetHeight - 8; // 8px adjust for the tip
    }
  }

  private generateUniqueId(prefix: string = ""): string {
    return (prefix + (10000 + ( Math.floor(Math.random() * 100000))));
  }

  // Get the actual dimension of the tooltip
  private getBoundingDirectiveRect(): void {
    let domDirective = this.dom.query('#'+ this.directiveId);
    this.directiveRect = domDirective.getBoundingClientRect();
    this.directiveRect.offsetWidth = domDirective.offsetWidth;
    this.directiveRect.offsetHeight = domDirective.offsetHeight;
  }

  private getTooltipElementWidth(): number {
    if (!this.tooltipWordWrap) {
      // auto width
      this.tooltipElementWidth = this.tooltipElement.offsetWidth;
    }
    return this.tooltipElementWidth;
  }

  private renderOnBottom(): void {
    this.setStyleY('bottom');
  }

  private renderOnLeft(): void {
    this.setStyleX('left');
  }

  private renderOnRight(): void {
    this.setStyleX('right');
  }

  private renderOnTop(): void {
    this.setStyleY('top');
  }

  private renderToDirectivePosition(): void {
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
  }

  // position: 'left' or 'right'
  private setStyleX(position: string): void {
    this.dom.addClass(this.tooltipElement, position);
    this.dom.setStyle(this.tooltipElement, 'left', this.calculateTooltipElementLeft(position) + 'px');
    this.dom.setStyle(this.tooltipElement, 'top', this.calculateTooltipElementTop(position) + 'px');
    this.dom.setStyle(this.tooltipElement, 'visibility', 'visible');
  }

  // position: 'top' or 'bottom'
  private setStyleY(position: string): void {
    this.dom.addClass(this.tooltipElement, position);
    this.dom.setStyle(this.tooltipElement, 'left', this.calculateTooltipElementLeft(position) + 'px');
    this.dom.setStyle(this.tooltipElement, 'top', this.calculateTooltipElementTop(position) + 'px');
    this.dom.setStyle(this.tooltipElement, 'visibility', 'visible');
  }

  // tooltipElementWidth will only be set when tooltipWordWrap is true
  private setTooltipWordWrapWidth(): void {
    if (this.tooltipWordWrap) {
      switch (this.tooltipWidth) {
        case WIDE: {
          this.tooltipElementWidth = 250;
          break;
        }
        case NARROW : {
          this.tooltipElementWidth = 100;
          break;
        }
        default :  // standard width
          this.tooltipElementWidth = 150;
          break;
      }
    }
  }

}
