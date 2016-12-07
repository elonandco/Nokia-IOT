import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Store} from '@ngrx/store';
import {SidebarGroupComponent} from '../sidebar-groups/sidebar-groups.component';
import {SidebarWidgetComponent} from '../sidebar-widgets/sidebar-widgets.component';

@Component({
  selector: 'dashboard-sidebar',
  directives: [SidebarGroupComponent, SidebarWidgetComponent],
  templateUrl: '/src/core/components/dashboard/sidebar/dashboard-sidebar.component.html'
})

export class DashboardSidebarComponent implements OnInit {
  whoActive:Observable<any>;
  dsoObs:Observable<any>;
  sidebarActive:boolean = false;
  treeJson:Object = {};

  constructor(private _store:Store<any>, private _http:Http) {
    this.whoActive = _store.select('SidebarUiContainerReducer');
    this.dsoObs = _store.select('DSOModelReducer');

    this.whoActive.subscribe(
      data => {
        this.sidebarActive = (data === "widget" || data === "group") ? true : false;
      },
      (error) => {
        console.log('Error:', +error);
      }
    );
  }

  ngOnInit() {
    this.dsoObs.subscribe((data:any)=> {
        let domains = _.find(data.domains.domain, function (domain:any) {
          return domain.id === "GroupTree";
        });
        
        if (domains && domains.services && domains.services.service){
        	let groups = domains.services.service[0].attributes.groups;
        
	        if (groups && typeof groups === 'string') {
	          this.treeJson['groups'] = JSON.parse(groups);
	        } else {
	          this.treeJson['groups'] = groups;
	        }
        }
      },
      error => {
        console.log('Error on initializing the tree data.');
      }
    );
  }
}
