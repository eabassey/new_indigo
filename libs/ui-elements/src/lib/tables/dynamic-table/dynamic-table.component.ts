import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { take, skipWhile } from 'rxjs/operators';

@Component({
  selector: 'flx-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class FLXDynamicTableComponent implements OnInit, OnDestroy {
  // constructor() { }
  //  Eg: myContacts = [
  //     { Name: 'Parvez Ansari', Accepted: '1', birthday: 'feb', hair: 'brown' },
  //     { Name: 'Tayyeb Shaikh', Accepted: '0', birthday: 'march' },
  //     { Name: 'Ashfaque Shaikh', Accepted: '2' },
  //     { Name: 'Kyle' },
  //   ];
  @Input() heading: string = '';
  @Input() subheading: string = '';

  @Input() tableData$: Observable<Array<object>> = of([]);
  @Input() emptyCellName = 'N/A';
  @Input() missingFieldText!: string;
  @Input() excludeFields!: string[];

  createTable() {
    this.tableData$
      .pipe(
        skipWhile((x) => !x),
        take(1),
      )
      .subscribe((tableData: any) => {
        if (tableData.length > 0) {
          const tableLength = tableData.length;
          // CREATE DYNAMIC TABLE.
          const table = document.createElement('table');
          table.setAttribute('class', 'dynamic-table-styles');

          const col = []; // define an empty array
          for (let i = 0; i < tableLength; i++) {
            for (let key in tableData[i]) {
              if (!key.match(/_id/g)) {
                if (col.indexOf(key) === -1) {
                  col.push(key);
                }
              }
            }
          }

          // CREATE TABLE HEAD .
          const tHead = document.createElement('thead');

          // CREATE ROW FOR TABLE HEAD .
          const hRow = document.createElement('tr');

          // ADD COLUMN HEADER TO ROW OF TABLE HEAD.
          for (let i = 0; i < col.length; i++) {
            const th = document.createElement('th');
            th.innerHTML = col[i].toUpperCase();
            hRow.appendChild(th);
          }
          tHead.appendChild(hRow);
          table.appendChild(tHead);

          // CREATE TABLE BODY .
          const tBody = document.createElement('tbody');

          // ADD COLUMN HEADER TO ROW OF TABLE HEAD.
          for (let i = 0; i < tableLength; i++) {
            const bRow = document.createElement('tr');

            // CREATE ROW FOR EACH RECORD .
            for (let j = 0; j < col.length; j++) {
              const td = document.createElement('td');
              if (tableData[i][col[j]]) {
                td.innerHTML = tableData[i][col[j]];
              } else {
                td.innerHTML = this.emptyCellName;
              }
              bRow.appendChild(td);
            }
            tBody.appendChild(bRow);
          }
          table.appendChild(tBody);

          // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
          const divContainer = document.getElementById('my-dynamic-table');
          if (!!divContainer) {
            divContainer.innerHTML = '';
            divContainer.appendChild(table);
          }
        }
      });
  }

  ngOnInit() {
    this.createTable();
  }

  ngOnDestroy() {}
}
