import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfig } from '@wilo';
import { ApplicationsService } from '../applications.service';

@Component({
  selector: 'app-application-edit',
  templateUrl: './application-edit.component.html',
  styleUrls: ['./application-edit.component.scss']
})
export class ApplicationEditComponent implements OnInit {

  editForm: FormGroup;
application;
  constructor(
      private applicationsService: ApplicationsService,
      private route: ActivatedRoute,
      private router: Router,
      private fb: FormBuilder
  ) { }

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('appId');
      this.setForm();
      this.applicationsService.getApp(id).then(app => {
        this.application = app;
        this.setForm(app);
      })
  }

  setForm(app?: AppConfig) {
    this.editForm = this.fb.group({
      name: app?.name || '',
      startState: app?.startState || '',
      description: app?.description || ''
    });
  }

  save() {
    console.log({App: this.editForm.value});
    this.router.navigate(['/builder/applications']);

  }

  cancel() {
    this.editForm.reset();
    this.router.navigate(['/builder/applications']);
  }

}
