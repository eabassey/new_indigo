import { ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getErrors, RemoveError } from '@indigo/error-handler';

import { CustomValidators } from '@indigo/utilities';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { ENVIRONMENT } from '../../../services/constants';
import { getIdentitySubmitting, getLoginError, Login, ResetForgotPassword } from '../../../store';

@Component({
  selector: 'local-login',
  templateUrl: './local-login.component.html',
  styleUrls: ['local-login.component.scss']
})
export class LocalLoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isOnline = true;
  formSub: Subscription;
  networkSub: Subscription;
  error$: Observable<any>;
  @Input() hideFormInitially: boolean;

  isSubmitting$: Observable<boolean>;
  constructor(
    private _fb: FormBuilder,
    private _store: Store<any>,
    private route: ActivatedRoute,
    private _router: Router,
    @Inject(ENVIRONMENT) private environment: any
  ) {}
  ngOnInit() {
    this.isSubmitting$ = this._store.select(getIdentitySubmitting);
    this.error$ = this._store.select(getLoginError);
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, CustomValidators.cleanOnEmpty]],
      password: ['', [Validators.required, CustomValidators.cleanOnEmpty]]
    });
    this.networkCheck();
  }

  login() {
    let credentials = this.loginForm.value;
    // credentials.client_version = this.environment.version;
    this._store.dispatch(new Login(credentials));
  }

  showLoginForm() {
    this.hideFormInitially = false;
  }

  goToForgotPassword() {
    this._store.dispatch(new ResetForgotPassword());
    this._router.navigate(['/auth/forgot-password']);
  }

  removeErrors() {
    // Remove errors from the error stack so that they dont randomly pop up
    this._store
      .select(getErrors)
      .pipe(
        filter(x => !!x),
        take(1)
      )
      .subscribe(errors => {
        const keys = Object.keys(errors);
        keys.forEach(element => {
          this._store.dispatch(new RemoveError({ dataKey: element }));
        });
      });
  }

  networkCheck() {
    // this.networkSub = this.networkService.isOnline.subscribe(status => {
    //   this.isOnline = status;
    // });
  }

  ngOnDestroy() {
    if (this.formSub) this.formSub.unsubscribe();
    if (this.networkSub) this.networkSub.unsubscribe();
    this.removeErrors();
  }
}
