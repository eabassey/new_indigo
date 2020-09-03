import { StateConfig } from '@wilo';
import { EMPTY, forkJoin, of } from 'rxjs';
import * as TP from '@indigo/templates';

export const SIL_27: StateConfig = {
  id: '27',
  name: 'job-invoiced',
  startNode: 'node1',
  nodes: {
    node1: {
      component: TP.Node1Component
    },
    MiscellaneousClass: {
      name: 'miscellaneous-class',
      nodeType: 'decision',
      errorHandler: {
        displayFormat: 'dialog',
        retryPolicy: { retryInterval: 300, retryCount: 3 },
        onRetryComplete: () => {
          return EMPTY;
        }
      },
      serverCalls: [
        {
          key: 'fullItemOne',
          errorMessage: '',
          directCall: ({http}, route) => {
            const claimId = route.snapshot.paramMap.get('jobId');
            console.log({claimId})
            return of({val: 'test'});
          }
        }
      ],
      decision: () => {},
      // decision: ({}) => {
      //   return forkJoin([
      //     store.select(getFullItemOne).pipe(
      //       skipWhile(x => !x),
      //       take(1)
      //     ),
      //     store.select(getFullItemTwo).pipe(
      //       skipWhile(x => !x),
      //       take(1)
      //     ),
      //     store.select(getRelatedItemTwos).pipe(
      //       skipWhile(x => !x),
      //       take(1)
      //     )
      //   ])
      //     .pipe(
      //       filter(x => !!x),
      //       take(1)
      //     )
      //     .subscribe(([claim, job, relatedItems]) => {
      //       if (claim.claim_type === 21) {
      //         const jobCheck = job.valid_job === 1 || job.valid_job === 101;
      //         let relatedCheck = false;

      //         relatedItems.forEach(element => {
      //           if (element.valid_job === 1 || element.valid_job === 101) {
      //             relatedCheck = true;
      //           }
      //         });
      //         if (jobCheck || relatedCheck) {
      //           modal.openModalDirectly(instance => {
      //             instance.type = 'warning';
      //             instance.message =
      //               'Payments for valid work can not be made against a Miscellaneous claim class. Please proceed and change the claim class.';
      //             instance.navButtons = [
      //               {
      //                 text: 'Change claim class',
      //                 clickHandler: event => {
      //                   controller.dispatch(new SetNextNode('ChangeClaimClass'));
      //                 },
      //                 linkType: 'close',
      //                 color: 'alert'
      //               }
      //             ];
      //           });
      //         } else {
      //           controller.dispatch(new SetNextNode('Decision'));
      //         }
      //       } else {
      //         controller.dispatch(new SetNextNode('Decision'));
      //       }
      //     });
      // }
    }
  },

}
