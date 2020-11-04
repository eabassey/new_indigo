import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationsService } from '../applications.service';

@Component({
  selector: 'app-application-edit',
  templateUrl: './application-edit.component.html',
  styleUrls: ['./application-edit.component.scss']
})
export class ApplicationEditComponent implements OnInit {

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
