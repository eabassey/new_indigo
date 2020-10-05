import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { of, empty } from 'rxjs';
import * as IdentityActions from './identity.actions';
import { AuthenticationService } from '../services/authentication.service';
import { IDENTITY_CONFIG, IdentityConfig, ENVIRONMENT } from '../services/constants';
import { Store } from '@ngrx/store';
// import { clearReminders } from '../../reminders-core/store/reminders.actions';
// import { ReminderService } from '../../reminders-core';
import { JwtHelperService } from '@auth0/angular-jwt';
// import { UUID } from 'angular2-uuid';
import { HttpClient } from '@angular/common/http';
import { BigFormService, CoreServices } from '@wilo';

@Injectable()
export class IdentityEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private authenticationService: AuthenticationService,
    // private indexedDbService: IndexedDbService,
    // private cryptoService: CryptoService,
    @Inject(IDENTITY_CONFIG) private identityConfig: IdentityConfig,
    @Inject(ENVIRONMENT) private environment: any,
    private store: Store<any>,
    // private reminderService: ReminderService,
    private bf: BigFormService,
    private http: HttpClient,
    private svc: CoreServices,
  ) {
    // console.log(this.identityConfig.after_login_url);
  }

  @Effect()
  forgotPassword$ = this.actions$.pipe(
    ofType<IdentityActions.ForgotPassword>(IdentityActions.IdentityActionTypes.FORGOT_PASSWORD),
    switchMap(action => {
      const email = action.payload.email;
      return this.authenticationService.sendResetLink(email).pipe(
        map(data => {
          return new IdentityActions.ForgotPasswordSuccess(data);
        }),
        catchError(err =>
          of(
            new IdentityActions.ForgotPasswordFail({
              ...err,
              dataKey: 'forgotPassword',
              errorMessage: err.error.reason
            })
          )
        )
      );
    })
  );

  @Effect()
  login$ = this.actions$.pipe(
    ofType<IdentityActions.Login>(IdentityActions.IdentityActionTypes.LOGIN),
    mergeMap<any, any>(action => {
      const credentials = action.payload;
      // if (window.navigator.onLine) {
      //   this.cryptoService.createKeyAsBlobAndStore(credentials);
      // }
      return this.authenticationService.login(credentials).pipe(
        mergeMap<any, any>(res => {
          if (res && res.success === true) {
            const jwtHelper = new JwtHelperService();
            const jwtPack = jwtHelper.decodeToken(res.user.token);
            const { email, token } = res.user;
            this.svc.auth.setUser(res.user);
            localStorage.setItem('flexus.web.jwtToken', res.user.token);
            localStorage.setItem('flexus.web.user', JSON.stringify(res));

            // SET AUTH METHOD OF RESPONSE
            localStorage.setItem('flexus.web.authMethod', 'local');

            return this.http
              .post(
                `${this.environment.api_url}v1/staff_action/get_staffmember/`,
                { staff_id: jwtPack.user.id },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Token ${res.user.token}`
                  }
                }
              )
              .pipe(
                map((response: any) => response.payload),
                map(
                  staff_member => {
                    const userData = {
                      email,
                      ...jwtPack,
                      token: localStorage.getItem('flexus.web.jwtToken'),
                      user: { ...staff_member, ...jwtPack.user }
                    }
                    this.svc.auth.setUser(userData);
                    localStorage.setItem('flexus.web.jwtToken', userData.token);
                    localStorage.setItem('flexus.web.user', JSON.stringify(userData));
                    return new IdentityActions.LoginSuccess(userData)
                  })
              );
          } else {
            return of(new IdentityActions.LoginFail({ ...res, dataKey: 'login' }));
          }
        }),
        catchError(err => {
          console.log({ err });
          if (err && err.name && err.name === 'TimeoutError') {
            return of(
              new IdentityActions.LoginFail({
                ...err,
                dataKey: 'login',
                errorMessage: `${err.message}. Server may be down.`
              })
            );
          } else {
            return of(
              new IdentityActions.LoginFail({
                ...err,
                dataKey: 'login',
                errorMessage: err && err.error ? err.error.reason : ''
              })
            );
          }
        })
      );
    })
  );

  @Effect()
  Azurelogin$ = this.actions$.pipe(
    ofType<IdentityActions.AzureLogin>(IdentityActions.IdentityActionTypes.AZURE_LOGIN),
    switchMap<any, any>(action => {
      const res = action.payload;
      console.log({ res });
      if (res && res.success === true) {
        const jwtHelper = new JwtHelperService();
        const jwtPack = jwtHelper.decodeToken(res.user.token);
        const { email, token } = res.user;
        this.svc.auth.setUser(res.user);
        localStorage.setItem('flexus.web.jwtToken', res.user.token);
        localStorage.setItem('flexus.web.user', JSON.stringify(res));

        // SET AUTH METHOD OF RESPONSE
        localStorage.setItem('flexus.web.authMethod', 'azuread');
        return this.http
          .post(
            `${this.environment.api_url}v1/staff_action/get_staffmember/`,
            { staff_id: jwtPack.user.id },
            {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Token ${localStorage.getItem('flexus.web.jwtToken')}`
              }
            }
          )
          .pipe(
            map((response: any) => response.payload),
            map(
              staff_member => {
                const userData = {
                  email,
                  ...jwtPack,
                  token: localStorage.getItem('flexus.web.jwtToken'),
                  user: { ...staff_member, ...jwtPack.user }
                }
                this.svc.auth.setUser(userData);
                localStorage.setItem('flexus.web.jwtToken', userData.token);
                localStorage.setItem('flexus.web.user', JSON.stringify(userData));
                return new IdentityActions.LoginSuccess(userData)
              })
          );
      } else {
        return of(new IdentityActions.LoginFail({ ...res, dataKey: 'login' }));
      }
    }),
    catchError(err => {
      console.log({ err });
      if (err && err.name && err.name === 'TimeoutError') {
        return of(
          new IdentityActions.LoginFail({
            ...err,
            dataKey: 'login',
            errorMessage: `${err.message}. Server may be down.`
          })
        );
      } else {
        return of(
          new IdentityActions.LoginFail({
            ...err,
            dataKey: 'login',
            errorMessage: err && err.error ? err.error.reason : ''
          })
        );
      }
    })
  );

  @Effect({dispatch: false})
  navigateToDashboard = this.actions$.pipe(
    ofType<IdentityActions.LoginSuccess>(IdentityActions.IdentityActionTypes.LOGIN_SUCCESS),
    map(action => {
      // this.indexedDbService.user.get('id').then(oldUserID => {
      //   this.reminderService.activateReminders();
      //   if (action.payload.user && oldUserID !== action.payload.user.id) {
      //     // if different user logged in reset user info
      //     this._clearUserSpecificData();
      //     this.indexedDbService.user.put(action.payload.user.id, 'id');
      //   }
      // });
      this.router.navigate([this.identityConfig.after_login_url]);
    }),
    // map(data => new GetAllInfo(`${this.environment.api_url}v1/all_info/`))
  );

  @Effect()
  checkLogin$ = this.actions$.pipe(
    ofType<IdentityActions.GetLoggedInUser>(IdentityActions.IdentityActionTypes.GET_LOGGED_IN_USER),
    switchMap(action => {
      return this.authenticationService.getLoggedInUserFromServer(action.payload).pipe(
        mergeMap((data: any) => {
          const jwtHelper = new JwtHelperService();
          const jwtPack = jwtHelper.decodeToken(data.token);
          const { email, token } = data;
          this.svc.auth.setUser(data);
          localStorage.setItem('flexus.web.jwtToken', token);
          localStorage.setItem('flexus.web.user', JSON.stringify(data));
          if (this.authenticationService.userIsAuthenticated) {
            return this.http
              .post(
                `${this.environment.api_url}v1/staff_action/get_staffmember/`,
                { staff_id: jwtPack.user.id },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Token ${token}`
                  }
                }
              )
              .pipe(
                map((response: any) => response.payload),
                map(
                  staff_member => {
                    const userData = {
                      email,
                      token,
                      ...jwtPack,
                      user: { ...staff_member, ...jwtPack.user }
                    }
                    this.svc.auth.setUser(userData);
                    localStorage.setItem('flexus.web.jwtToken', userData.token);
                    localStorage.setItem('flexus.web.user', JSON.stringify(userData));
                    return new IdentityActions.GetLoggedInUserSuccess(userData);
                  })
              );
          } else {
            return empty();
          }
        }),
        catchError(err =>
          of(new IdentityActions.LoginFail({ ...err, dataKey: 'login', errorMessage: err.error.reason }))
        )
      );
    })
  );

  @Effect()
  getUserSilently$ = this.actions$.pipe(
    ofType<IdentityActions.GetLoggedInUserSilently>(IdentityActions.IdentityActionTypes.GET_LOGGED_IN_USER_SILENTLY),
    switchMap(action => {
      return this.authenticationService.getLoggedInUserFromServerSilently(action.payload).pipe(
        switchMap((data: any) => {
          // console.log('in loggedInUserEffect', data);
          const jwtHelper = new JwtHelperService();
          const jwtPack = jwtHelper.decodeToken(data.token);
          const { email, token } = data;
          this.svc.auth.setUser(data);
          localStorage.setItem('flexus.web.jwtToken', token);
          localStorage.setItem('flexus.web.user', JSON.stringify(data));
          if (this.authenticationService.userIsAuthenticated) {
            return this.http
              .post(
                `${this.environment.api_url}v1/staff_action/get_staffmember/`,
                { staff_id: jwtPack.user.id },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Token ${token}`
                  }
                }
              )
              .pipe(
                map((response: any) => response.payload),
                map(
                  staff_member => {
                    const userData = {
                      email,
                      token,
                      ...jwtPack,
                      user: { ...staff_member, ...jwtPack.user }
                    }
                    this.svc.auth.setUser(userData);
                    localStorage.setItem('flexus.web.jwtToken', token);
                    localStorage.setItem('flexus.web.user', JSON.stringify(userData));
                    return new IdentityActions.GetLoggedInUserSuccessSilently(userData);
                  })
              );
          } else {
            return empty();
          }
        }),
        catchError(err =>
          of(new IdentityActions.LoginFail({ ...err, dataKey: 'login', errorMessage: err.error.reason }))
        )
      );
    })
  );

  // @Effect()
  @Effect({dispatch: false})
  navigateTo$ = this.actions$.pipe(
    ofType<IdentityActions.GetLoggedInUserSuccess>(IdentityActions.IdentityActionTypes.GET_LOGGED_IN_USER_SUCCESS),
    map(action => {
      if (!this.identityConfig.no_auth_urls.includes(this.router.url)) {
        this.router.navigate([this.identityConfig.after_login_url]);
      }
      // return new GetAllInfo(`${this.environment.api_url}v1/all_info/`);
    })
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType<IdentityActions.LogOut>(IdentityActions.IdentityActionTypes.LOGOUT),
    map(() => {
      // this.controller.dispatch(
      //   new ChangeManifestState(state => ({
      //     ...state,
      //     activeManifestItemId: 0,
      //     activeManifestItem: null,
      //     activeNode: null,
      //     viewData: {},
      //     activeViewData: null,
      //     navigationStack: []
      //   }))
      // );
      // this.indexedDbService.currentItem.delete('currentItem');
      this.authenticationService.logout();
      // this.store.dispatch(clearReminders());
      return new IdentityActions.LogOutSuccess();
    })
  );

  private _clearUserSpecificData() {
    // clear user specific scratchpad data
    // this.indexedDbService.scratch_pad.delete('scratch_pad');
  }
}
