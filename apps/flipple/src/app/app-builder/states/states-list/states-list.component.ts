import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {StatesService} from '../states.service';



@Component({
  selector: 'app-states-list',
  templateUrl: './states-list.component.html',
  styleUrls: ['./states-list.component.scss']
})
export class StatesListComponent implements OnInit {

  states;
  constructor(
      private statesService: StatesService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.states = this.statesService.states;
  }

  goToEdit(state) {
    this.router.navigate([`./${state.id}`, 'edit'], {relativeTo: this.route})
  }

  goToConfig(state) {
    this.router.navigate([`./${state.id}`, 'config'], {relativeTo: this.route})
  }

  goToNodes(state) {
    this.router.navigate([`./${state.id}`, 'nodes'], {relativeTo: this.route})
  }

}
