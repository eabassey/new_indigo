import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineErrorComponent } from './components/inline-error/inline-error.component';
import { ErrorHandlerComponent } from './error-handler.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ErrorHandlerEffects } from './store/error-handler.effects';
import { reducer } from './store/error-handler.reducer';
import { ToastErrorComponent, FLXErrorModalComponent } from './components';
import { ToastrModule } from 'ngx-toastr';
import { GlobalErrorHandler } from './services/global-error-handler.service';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { ServerErrorsInterceptor } from './services/server-errors.interceptor';
import { ErrorsService } from './services/errors.service';
import { FLXIconModule, FLXButtonsModule, FLXHeadingsModule } from '@indigo/ui-elements';

const COMPONENTS = [InlineErrorComponent, ToastErrorComponent, ErrorHandlerComponent, FLXErrorModalComponent];
@NgModule({
  imports: [
    CommonModule,
    ToastrModule,
    FLXIconModule,
    FLXButtonsModule,
    FLXHeadingsModule,
    // UICompositesModule,
    StoreModule.forFeature('errorHandler', reducer),
    EffectsModule.forFeature([ErrorHandlerEffects])
  ],
  declarations: [...COMPONENTS],
  providers: [
    GlobalErrorHandler,
    ErrorsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ServerErrorsInterceptor,
    //   multi: true
    // },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ],
  exports: [...COMPONENTS]
})
export class ErrorHandlerModule {}
