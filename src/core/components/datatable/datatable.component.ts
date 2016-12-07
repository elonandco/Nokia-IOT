import {Component,Input, EventEmitter} from "@angular/core";

import {DataTable} from 'primeng/primeng';
import {Column} from 'primeng/primeng';

@Component({
  selector: 'data-table',
  templateUrl: '/src/core/components/datatable/datatable.component.html',
  directives: [DataTable,Column]
})

export class Datatable{

  private clickEmitter:EventEmitter<any> = new EventEmitter<any>();

  @Input()
  columns;

  @Input()
  columnData;

  constructor() {}

  ngOnInit(){
  }


}
