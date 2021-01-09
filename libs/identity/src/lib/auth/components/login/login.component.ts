import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { ENVIRONMENT } from '../../../services/constants';

@Component({
  selector: 'flx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush, // causing error message to misbehave
})
export class LoginComponent implements OnInit {
  logo_url!: string;
  second_logo_url!: string;
  byline!: string;

  //
  azureLoginUrl!: string;

  useMultipleLogins!: boolean;

  constructor(private cdr: ChangeDetectorRef, private _store: Store<any>, @Inject(ENVIRONMENT) private environment: any) {}

  ngOnInit() {
    this.azureLoginUrl = !!this.environment['azure'] ? this.environment['azure']['loginUrl'] : null;
    this.useMultipleLogins = !!this.environment['useMultipleLogins'];
    if (this.environment.branding) {
      this.logo_url = this.environment.branding.logo_url;
      this.environment.client === 'mul'
        ? (this.second_logo_url = 'assets/images/DSTV_logo_new.png')
        : (this.second_logo_url = '');
      this.byline = this.environment.branding.byline;
    } else {
      this.logo_url = 'assets/images/4-sure-logo.svg';
    }

    // this._store.dispatch(new HideActionPanel());
    // this.cdr.detectChanges();
  }
}
