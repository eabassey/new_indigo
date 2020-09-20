import { NgModule } from '@angular/core';
import { LoginComponent, AzureCallbackComponent } from './components';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { FLXAuthShellComponent } from './auth-shell.component';
import { AuthRoutingModule } from './auth.routing';
import { LocalLoginComponent } from './components/local-login/local-login.component';
import { AzureLoginComponent } from './components/azure-login/azure-login.component';
import {ErrorHandlerModule} from '@indigo/error-handler';
import {UIElementsModule} from '@indigo/ui-elements';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InlineSVGModule,
    UIElementsModule,
    ErrorHandlerModule,
    AuthRoutingModule
  ],
  declarations: [
    AzureCallbackComponent,
    LoginComponent,
    LocalLoginComponent,
    AzureLoginComponent,
    FLXAuthShellComponent
  ],
  providers: []
})
export class AuthModule {}
