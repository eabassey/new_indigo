import { Component, Input } from "@angular/core";



@Component({
    selector: 'node2',
    template: `{{text || 'Node 2 Stuffs'}}`
})
export class Node2Component {
  @Input() text!: string;
}
