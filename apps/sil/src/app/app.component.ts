import { Component } from '@angular/core';
import { WorkflowLayoutComponent } from '@indigo/layout';

@Component({
  selector: 'indigo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  layoutComponent = WorkflowLayoutComponent;
}
