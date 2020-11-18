import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ApplicationsService} from '../applications.service';
import {AppConfig, ClientConfig} from '@wilo';

@Component({
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.scss']
})
export class ApplicationsListComponent implements OnInit {


  applications: AppConfig[];
  constructor(
      private applicationsService: ApplicationsService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.applicationsService.getConfig().then((config: ClientConfig) => {
      this.applications = Object.entries(config.apps).map(([id,val]) => ({id, ...val}));
    })
    // this.applications = this.applicationsService.applications;
  }

  goToEdit(app) {
    this.router.navigate([`./${app.id}`, 'edit'], {relativeTo: this.route})
  }

  goToConfig(app) {
    this.router.navigate([`./${app.id}`, 'config'], {relativeTo: this.route})
  }

  goToStates(app) {
    this.router.navigate([`./${app.id}`, 'states'], {relativeTo: this.route})
  }

}
