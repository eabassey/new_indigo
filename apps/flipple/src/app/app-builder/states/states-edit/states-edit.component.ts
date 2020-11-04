import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-states-edit',
  templateUrl: './states-edit.component.html',
  styleUrls: ['./states-edit.component.scss']
})
export class StatesEditComponent implements OnInit {

  appId;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.appId = this.route.snapshot.parent.paramMap.get('appId');
  }

}
