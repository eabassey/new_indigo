import { Component, OnInit } from '@angular/core';
import { WorkflowLayoutComponent } from '@indigo/layout';
import { CoreServices } from '@wilo';
import mingo from 'mingo';

@Component({
  selector: 'indigo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'sil';
  data = [
    {name: 'James', age: 12, pets: [{animal: 'cat', color: 'white'}, {animal: 'dog', color: 'blue'}]},
    {name: 'John', age: 30},
    {name: 'Sam', age: 4, pets: [{animal: 'lion', color: 'grey'}]}
  ]
  comp = WorkflowLayoutComponent;
  constructor(private svc: CoreServices) {}

  ngOnInit() {
    // let cursor = mingo.find(this.data, JSON.parse(JSON.stringify({age: {$lte: 5}})))
    // console.log(cursor.all());
    const TransRes = this.svc.dataTransformers.transform(this.data, {
      parentMapper: {'name': 'full_name'},
      childMappers: [
        {
          path: 'pets',
          mapper: {'animal': 'type'}
        }
      ]
    });
    console.log({TransRes});
  }
}
