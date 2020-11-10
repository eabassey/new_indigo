import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
      this.application = this.applicationsService.applications.find(a => a.id === id);
      this.editForm = this.fb.group({
        name: '',
        startState: '',
        description: ''
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
