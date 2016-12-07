import {Component, OnDestroy, ElementRef, AfterViewInit, OnInit,DynamicComponentLoader,Injector, ContentChildren, ViewChild, ViewContainerRef} from "@angular/core";
import {QuickLinkContainerComponent} from "./quick-links/quick-link-container.component";
import {DashboardSidebarComponent} from "./sidebar/dashboard-sidebar.component";
import {WidgetContainerComponent} from "./widgets/widget-container.component";
import {InitComponent} from "../init/init.component"
import {Observable} from 'rxjs/Rx';
import {Store} from '@ngrx/store';
import {Router,OnReuse,CanReuse,OnActivate, OnDeactivate, Location} from '@angular/router-deprecated';//'@angular/router';
import {DASHBOARD_SHOW,DASHBOARD_REFRESH,DASHBOARD_MASTER_REFRESH} from "../../reducers/dashboard.reducer"; 

@Component({
  selector: 'dashboard-component',
  templateUrl: '/src/core/components/dashboard/dashboard.component.html',
  directives: [QuickLinkContainerComponent, DashboardSidebarComponent,InitComponent,WidgetContainerComponent]
})
export class DashboardComponent implements OnDestroy, AfterViewInit, OnInit, OnReuse, CanReuse, OnActivate, OnDeactivate{
  
  menuObs:Observable<any>;
  widgetQLObs:Observable<any>;
  userPrefObs:Observable<any>;
  widgetGroupActive:boolean;
  widgetDragActive:boolean;
  isOverlayActive: boolean = false;
  hideDash:boolean = true;
  mode:string;

  constructor(private _store:Store<any>,private _dcl:DynamicComponentLoader) { 
			
    this.menuObs = this._store.select('MenuReducer');
    this.menuObs.subscribe(
        data => {
          this.isOverlayActive = data;
      },
      (error) => {
        console.log('Error:', error);
      }
    );

    this.widgetQLObs = this._store.select('SidebarUiContainerReducer');
    this.widgetQLObs.subscribe(
        data => {
          this.widgetDragActive = false;
          this.widgetGroupActive = false;

          switch(data){
            case "widget":{
              this.widgetDragActive = true;
              break;
            }
            case "group":{
              this.widgetGroupActive = true;
              break
            }
          }
      },
      (error) => {
        console.log('Error:', error);
      }
    );
    
    this.groupsObs = this._store.select('GroupContextReducer');
    this.groupsObs.subscribe(
        data => {
        	//todo:
        	this.hideDash = true;
        },
      (error) => {
        console.log('Error:', error);
      }
    );
    		

  }
  
  ngOnInit() {
	  this.mode = this._store.value.DashboardReducer;
		
		if (this.mode && this.mode === "create"){
			this.hideDash = true;
		} else {
			this.hideDash = false;
		}
		
		delete this._store.value.DashboardReducer;
  }

  handleInitComponentEvent(event){
    this.hideDash =false;
  }

  isDone(done:boolean) {
    this.hideDash = false
  }

  routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction):void{
	
  }
  
  routerOnDeactivate(next: ComponentInstruction, prev: ComponentInstruction):void{
	  
  }
  routerCanReuse(next: ComponentInstruction, prev: ComponentInstruction) : boolean {
    return true;
  }
  
  routerOnReuse(next: ComponentInstruction, prev: ComponentInstruction) : void {
    console.log("reusing dashboard-component");
  }
  
  ngOnDestroy(){
	  console.log("Destruying dashboard-component");
  }
 
}