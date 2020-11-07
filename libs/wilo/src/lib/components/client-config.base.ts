import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreServices } from '../services/core.services';
import { ClientConfig } from '../models';
import { Observable } from 'rxjs';

@Component({template: ''})
export abstract class ClientConfigBase implements OnInit {
    loading$: Observable<boolean>;
  constructor(
    public svc: CoreServices,
    public route: ActivatedRoute,
  ) {}

    ngOnInit() {
      this.loading$ = this.svc.loader.loading$;
    }

}
