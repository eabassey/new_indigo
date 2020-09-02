import { Component, Input, OnInit } from '@angular/core';
import { NodeConfig } from '../models';


@Component({
  selector: 'decision-node',
  template: ''
})
export class DecisionNodeComponent implements OnInit {
  @Input() activeNode: NodeConfig;

  ngOnInit() {
    console.log({DecisionNode: this.activeNode})
  }
}
