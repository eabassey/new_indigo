import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorsService } from './errors.service';
import { AddError } from '../store/error-handler.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    // Because the ErrorHandler is created before the providers, we’ll have to use the Injector to get them.
    private injector: Injector,
  ) {}

  handleError(error: Error | HttpErrorResponse) {
    // const notificationService = this.injector.get(NotificationService);
    const errorsService = this.injector.get(ErrorsService);
    const store = this.injector.get(Store);
    // const router = this.injector.get(Router);
    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (!navigator.onLine) {
        // Handle offline error
        //  return notificationService.notify('No Internet Connection');
      } else {
        // Handle Http Error (error.status === 403, 404...)
        //  return notificationService.notify(`${error.status} - ${error.message}`);
        //JUST FOR TEST -- REMOVE AFTER
        // this.store.dispatch(new AddError({ dataKey: 'someServerError', errorMessage: '', error: null, retryCall: null }));
      }
    } else {
      // Handle Client Error (Angular Error, ReferenceError...)
      // router.navigate(['/error'], { queryParams: {error: error} });
    }
    // Log the error anyway
    console.error('It happens: ', error);
    //JUST FOR TEST -- REMOVE AFTER
    // store.dispatch(new AddError({ dataKey: 'someServerError', errorMessage: JSON.stringify(error), error: null, retryCall: null }));
  }
}

// @Injectable()
// export class GlobalErrorHandler implements ErrorHandler {
//   constructor(
//     private injector: Injector,
//   ) {}

//   handleError(error: Error | HttpErrorResponse) {
//     const notificationService = this.injector.get(NotificationService);
//     const errorsService = this.injector.get(ErrorsService);
//     const router = this.injector.get(Router);

//     if (error instanceof HttpErrorResponse) {
//     // Server error happened
//       if (!navigator.onLine) {
//         // No Internet connection
//         return notificationService.notify('No Internet Connection');
//       }
//       // Http Error
//       // Send the error to the server
//       errorsService.log(error).subscribe();
//       // Show notification to the user
//       return notificationService.notify(`${error.status} - ${error.message}`);
//     } else {
//       // Client Error Happend
//       // Send the error to the server and then
//       // redirect the user to the page with all the info
//       errorsService
//           .log(error)
//           .subscribe(errorWithContextInfo => {
//             router.navigate(['/error'], { queryParams: errorWithContextInfo });
//           });
//     }
//   }
// }
