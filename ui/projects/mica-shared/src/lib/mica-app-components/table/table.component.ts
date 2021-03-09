import { Component, OnInit, Input } from '@angular/core';

export interface TableConfiguration {
  columns: { [key: string]: TableColumn };
}

export interface TableColumn {
  title: string;
  class?: string;
  width?: string;
  editable?: boolean;
}

export interface TableColumnData {
  
}

@Component({
  selector: 'mica-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() configuration: TableConfiguration;

  constructor() { }

  ngOnInit() {
    const config: TableConfiguration = {
      columns: {
        key: {
          title: 'Property Key'
        },
        value: {
          title: 'Property Value'
        }
      }
    };

    const data = [
      {
        key: 'My Key',
        value: 'My Value'
      }
    ];
  }

}
