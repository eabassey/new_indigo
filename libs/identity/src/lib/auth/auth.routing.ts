import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent, AzureCallbackComponent } from './components';
import { FLXAuthShellComponent } from './auth-shell.component';
import { NoAuthGuard } from '../guards';

const identityRoutes: Routes = [
  {
    path: 'azure',
    children: [
      {
        path: 'callback',
        component: AzureCallbackComponent,
        canActivate: [NoAuthGuard]
      }
    ]
  },
  {
    path: 'auth',
    component: FLXAuthShellComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [NoAuthGuard]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(identityRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
