import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nodes-list',
  templateUrl: './nodes-list.component.html',
  styleUrls: ['./nodes-list.component.scss']
})
export class NodesListComponent implements OnInit {

  appId;
  nodeId;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.appId = this.route.snapshot.parent.paramMap.get('appId');
  }

}
