import {Component, DynamicComponentLoader, ViewChild, ViewContainerRef, OnDestroy} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Dragula, DragulaService} from 'ng2-dragula/ng2-dragula';
import {Store} from '@ngrx/store';
import {TOGGLE_WIDGET_VIEW, WIDGET_REORDER} from '../../../reducers/user-preferences.reducer';


declare var System;

@Component({
  selector: 'widget-container',
  templateUrl: '/src/core/components/dashboard/widgets/widget-container.component.html',
  directives: [Dragula],
  viewProviders: [Dragula]
})

export class WidgetContainerComponent implements  OnDestroy{

  @ViewChild('content', {read: ViewContainerRef}) childContentPlace:ViewContainerRef;

  loadedWidgets:Array<any> = [];
  widgetIdx:number = 0;
  widgetsArray:Array<any> = [];
  userPrefObs:Observable;
  loadedWidgetsCompon:Array<any> = [];
  userPrefObsubscription: any;
  

  constructor(private _dcl:DynamicComponentLoader,
              dragulaService:DragulaService,
              private _store:Store<any>) {

    let drake = dragulaService.find('widgets-bag');
    if (drake) {
      dragulaService.destroy('widgets-bag');
    }

    dragulaService.setOptions('widgets-bag', {
      direction: 'horizontal',
      accepts: function (el, target, source, sibling) {
        return target.id !== 'sidebarDragulaContainer';

      }
    });

    dragulaService.drop.subscribe((value) => {
        this.onDragReOrder()
    });
    
    this.userPrefObs = this._store.select('UserPreferencesReducer');
    this.userPrefObsubscription = this.userPrefObs.subscribe(
      data=> {
        if (this.userPrefObs === null) {
          return
        }

        if (data.widgets) {
          this.loadWidgets(data.widgets);
        }
      },
      error=> {

      }
    );
  }

  onDragReOrder() {
    let widgetElements:Array<any> = Array.prototype.slice.call( document.getElementsByClassName('widget') );
    var widgetOrderArray:Array<any> = [];
    _.each(widgetElements, function (ele) {
      widgetOrderArray.push(ele.getAttribute('type'));
    });
    this._store.dispatch({type: WIDGET_REORDER, payload: widgetOrderArray});
  }

  private loadWidgets(widgets):any {
    this.userPrefObs = null;
    var widgets:any = this.reorderWidgets(widgets);
    this.widgetsArray = widgets;
    this.loadWidget(widgets[0])
  }

  private loadWidget(widget):any {
    return System.import(widget.path).then(componentModule => componentModule[widget.component]).then(component => {
      let _objectWidget = this.processWidget(component,widget);
      this.loadedWidgetsCompon.push(_objectWidget)
      return _objectWidget;
    });
  }

  private processWidget(component,widget){
	  let _object = this._dcl.loadNextToLocation(component, this.childContentPlace);
	  _object.then((ref)=> {
	      this.widgetIdx += 1;
	      ref.instance._ref = ref;	
	      ref.instance['isHidden'] = widget.isHidden;
	      if (this.widgetIdx < this.widgetsArray.length) {
	        this.loadWidget(this.widgetsArray[this.widgetIdx])
	      }
	  });
	  return _object;
  }
  
  private reorderWidgets(widgets) {
    let widgetsOrder = this._store.value.UserPreferencesReducer.widgetOrder;
    var newWidgetsOrder:Array<any> = [],
      loadedWidgets:Array<any> = [],
      widgetsNotLoaded:Array<any> = [];
    _.each(widgets, function (widget:any) {
      var foundWidget = _.find(widgetsOrder, function (orderedWidget) {
        return orderedWidget === widget.component
      });

      if (foundWidget) {
        loadedWidgets.push(widget)
      } else {
        widgetsNotLoaded.push(widget)
      }

    });

    _.each(widgetsOrder, function (orderedWidget) {
      var widget = _.find(loadedWidgets, function (loadedWidget) {
        return orderedWidget === loadedWidget.component
      });
      newWidgetsOrder.push(widget);
    });
    newWidgetsOrder = newWidgetsOrder.concat(widgetsNotLoaded);

    return newWidgetsOrder
  }
  
  ngOnDestroy(){
	  console.log("destruying widget-container:::");
	  this.userPrefObsubscription.unsubscribe();
  }
}
