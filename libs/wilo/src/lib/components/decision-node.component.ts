import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NodeConfig } from '../models';
import { Subscription } from 'rxjs';
import { CoreServices } from '../services';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'decision-node',
  template: ''
})
export class DecisionNodeComponent implements OnInit, OnDestroy {
  sub!: Subscription | void;
  @Input() activeNode!: NodeConfig;
  constructor(private svc: CoreServices, private route: ActivatedRoute) {}

  ngOnInit() {
    console.log({DecisionNode: this.activeNode})
    if (this.activeNode && this.activeNode.decision) {
      this.sub = this.activeNode.decision(this.svc, this.route);
    } else {
      throw new Error('One of the decision nodes exists without any decision. Add at least one decision to the node in the manifest.');
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
