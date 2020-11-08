import { Component, OnInit } from '@angular/core';
import mingo from 'mingo';

@Component({
  selector: 'indigo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'sil';
  data = [
    {name: 'James', age: 12},
    {name: 'John', age: 30},
    {name: 'Sam', age: 4}
  ]

  ngOnInit() {
    let cursor = mingo.find(this.data, JSON.parse(JSON.stringify({age: {$lte: 5}})))
    // console.log(cursor.all());
  }
}
