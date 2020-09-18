import { Action } from '@ngrx/store';

export enum IdentityActionTypes {
  RESET_FORGOT_PASSWORD = 'RESET_FORGOT_PASSWORD',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS',
  FORGOT_PASSWORD_FAIL = 'FORGOT_PASSWORD_FAIL',
  LOGIN = 'LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_FAIL',
  AZURE_LOGIN = 'AZURE_LOGIN',
  AZURE_LOGIN_SUCCESS = 'AZURE_LOGIN_SUCCESS',
  AZURE_LOGIN_FAIL = 'AZURE_LOGIN_FAIL',
  AZURE_LOGOUT = 'AZURE_LOGOUT',
  AZURE_LOGOUT_SUCCESS = 'AZURE_LOGOUT_SUCCESS',
  LOGOUT = 'LOGOUT',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
  GET_LOGGED_IN_USER = 'GET_LOGGED_IN_USER',
  GET_LOGGED_IN_USER_SILENTLY = 'GET_LOGGED_IN_USER_SILENTLY',
  GET_LOGGED_IN_USER_SUCCESS = 'GET_LOGGED_IN_USER_SUCCESS',
  GET_LOGGED_IN_USER_SUCCESS_SILENTLY = 'GET_LOGGED_IN_USER_SUCCESS_SILENTLY',
  GET_LOGGED_IN_USER_FAIL = 'GET_LOGGED_IN_USER_FAIL'
}

//

export class ForgotPassword implements Action {
  readonly type = IdentityActionTypes.FORGOT_PASSWORD;
  constructor(public payload: { environment: any; email: string }) {}
}

export class ResetForgotPassword implements Action {
  readonly type = IdentityActionTypes.RESET_FORGOT_PASSWORD;
}

export class ForgotPasswordSuccess implements Action {
  readonly type = IdentityActionTypes.FORGOT_PASSWORD_SUCCESS;
  constructor(public payload: any) {}
}

export class ForgotPasswordFail implements Action {
  readonly type = IdentityActionTypes.FORGOT_PASSWORD_FAIL;
  constructor(public payload: any) {}
}

export class Login implements Action {
  readonly type = IdentityActionTypes.LOGIN;
  constructor(public payload: { email: string; password: string }) {}
}

export class LoginSuccess implements Action {
  readonly type = IdentityActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class LoginFail implements Action {
  readonly type = IdentityActionTypes.LOGIN_FAIL;
  constructor(public payload: any) {}
}

export class AzureLogin implements Action {
  readonly type = IdentityActionTypes.AZURE_LOGIN;
  constructor(public payload: any) {}
}

export class AzureLoginSuccess implements Action {
  readonly type = IdentityActionTypes.AZURE_LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class AzureLoginFail implements Action {
  readonly type = IdentityActionTypes.AZURE_LOGIN_FAIL;
  constructor(public payload: any) {}
}

//
export class LogOut implements Action {
  readonly type = IdentityActionTypes.LOGOUT;
}

export class LogOutSuccess implements Action {
  readonly type = IdentityActionTypes.LOGOUT_SUCCESS;
}

//
export class GetLoggedInUser implements Action {
  readonly type = IdentityActionTypes.GET_LOGGED_IN_USER;
  constructor(public payload: string) {}
}

export class GetLoggedInUserSilently implements Action {
  readonly type = IdentityActionTypes.GET_LOGGED_IN_USER_SILENTLY;
  constructor(public payload: string) {}
}

export class GetLoggedInUserSuccess implements Action {
  readonly type = IdentityActionTypes.GET_LOGGED_IN_USER_SUCCESS;
  constructor(public payload: any) {}
}

export class GetLoggedInUserSuccessSilently implements Action {
  readonly type = IdentityActionTypes.GET_LOGGED_IN_USER_SUCCESS_SILENTLY;
  constructor(public payload: any) {}
}

export class GetLoggedInUserFail implements Action {
  readonly type = IdentityActionTypes.GET_LOGGED_IN_USER_FAIL;
  constructor(public payload: any) {}
}

export type identityActions =
  | Login
  | LoginSuccess
  | LoginFail
  | AzureLogin
  | AzureLoginSuccess
  | AzureLoginFail
  | LogOut
  | LogOutSuccess
  | GetLoggedInUser
  | GetLoggedInUserSilently
  | GetLoggedInUserSuccessSilently
  | GetLoggedInUserSuccess
  | GetLoggedInUserFail
  | ForgotPassword
  | ResetForgotPassword
  | ForgotPasswordSuccess
  | ForgotPasswordFail;
