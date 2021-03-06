import { StateConfig } from '@wilo';
import { EMPTY, forkJoin, of } from 'rxjs';
import * as TP from '@indigo/templates';
import { FormBuilderComponent, FormModel } from '@indigo/dynamic-forms';


export const SIL_27: StateConfig = {
  id: '27',
  name: 'job-invoiced',
  title: 'Job Invoicing',
  startNode: 'node1',
  events: {
    checkSomething: {
      triggerOn: ['form@lastName'],
      triggerWhen: (lastName) => {
        return lastName === 'mensah';
      },
      dataMutations: (svc) => {
      },
      serverCalls: [{key: 'posts', errorMessage: '', directCall: (svc) => svc.http.get('https://jsonplaceholder.typicode.com/posts')}]
    }
  },
  nodes: {
    node1: {
      component: {
        children:[
          {component: TP.Node1Component, inputs: {}},
          {
            component: FormBuilderComponent,
            inputs: {
              formModel: {
                fields: [
                  {type: 'text', label: 'First Name', name: 'firstName', value: '', controlClasses:"test", validators: [{type: 'required', errorMessage :"Please give first name"}, {type: 'minlength', arg: 5}]},
                  {type: 'text', label: 'Last Name', name: 'lastName', value: ''},
                  {type: 'textarea', label: 'Address', name: 'address', value: '', placeholder : '', rows: 4, cols: 20},
                  {type: 'checkbox', name: 'gender', options: [{label: 'Male', key: 'male'}, {label: 'Female', key: 'female'}]}
                ]
              } as FormModel
            }
          },
          {component: TP.Node1Component, inputs: {}},
        ]
      },
      navs: [
        {text: 'To Workflow',
        onClick: (svc) => {
          if (svc) {
            const url = svc.keyValueStore.getItem('workflowURL');
            svc.router.navigateByUrl(url);
          }
        } ,
        location: 'left'
      },
        {text: 'To Node 22', routerLink: ['node2'], location: 'right'}
      ],
      footerType: 'node_nav'
    },
    node2: {
      component: {
        children:[
          {component: TP.Node1Component, inputs: {}},
          {
            component: FormBuilderComponent,
            inputs: {
              formModel: {
                fields: [
                  {type: 'text', label: 'First Name', name: 'firstName', value: '', validators: [{type: 'required', errorMessage :"Please give first name"}, {type: 'minLength', arg: 5}]},
                ]
              } as FormModel
            }
          },
          {component: TP.Node1Component, inputs: {}},
        ]
      },
      navs: [
        {text: 'Back To Node 1', routerLink: ['./node1'], location: 'right'}
      ],
      footerType: 'node_nav'
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
            const claimId = route?.snapshot.paramMap.get('jobId');
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
      footerType: 'none'
    }
  },
  bigFormToStoreMapper: {
    lastName: [(val: any, svc: any) => {
      // console.log({svcc: svc})
      return val.toUpperCase();
    }, 'name.foo']
  }
}
