import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreServices } from '../services/core.services';
import { ClientConfig } from '../models';
import { CLIENT_CONFIG } from '../services';
import { Observable } from 'rxjs';

@Component({template: ''})
export abstract class ClientConfigBase implements OnInit {
    loading$: Observable<boolean>;
  constructor(
    public svc: CoreServices,
    public route: ActivatedRoute,
    @Inject(CLIENT_CONFIG) public clientConfig: ClientConfig
  ) {}

    ngOnInit() {
      this.loading$ = this.svc.loader.loading$;
    }

}
