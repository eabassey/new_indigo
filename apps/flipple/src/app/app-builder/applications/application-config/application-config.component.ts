import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationsService } from '../applications.service';

@Component({
  selector: 'app-application-config',
  templateUrl: './application-config.component.html',
  styleUrls: ['./application-config.component.scss']
})
export class ApplicationConfigComponent implements OnInit {

    application;
    constructor(
        private applicationsService: ApplicationsService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('appId');
        this.application = this.applicationsService.applications.find(a => a.id === id);
    }

}
