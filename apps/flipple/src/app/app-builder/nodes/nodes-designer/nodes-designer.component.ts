import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nodes-designer',
  templateUrl: './nodes-designer.component.html',
  styleUrls: ['./nodes-designer.component.scss']
})
export class NodesDesignerComponent implements OnInit {

  nodeId;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.nodeId = this.route.snapshot.paramMap.get('nodeId');
  }


}
