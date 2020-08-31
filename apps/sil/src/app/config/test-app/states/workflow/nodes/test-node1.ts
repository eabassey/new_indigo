import * as TP from '@indigo/templates';
import { NodeConfig } from '@wilo';





export const testNode1: NodeConfig = {
    id: 'testNode1',
    component: {
        children: [
            {
                component: TP.Node1Component,
                inputs: { greeting: 'Hello component'},
                outputs: {
                    doWork: (ev, sv) => {
                        // console.log('Node Event....: ', {ev, sv})
                    }
                }
            },
            {component: TP.Node2Component, inputs: {}, outputs: {}},
            {
                component: TP.FormRendererComponent,
                inputs: {
                    formModel: [
                        // new DynamicDatePickerModel({

                        //     id: 'arrivalDate',
                        //     inline: false,
                        //     label: 'Arrival',
                        //     placeholder: 'Date of Arrival'
                        // }),
                        // new DynamicInputModel({

                        //     id: 'sampleInput1',
                        //     label: 'Prove Input',
                        //     maxLength: 42,
                        //     placeholder: 'Proooove'
                        // }),
                    ]
                },
                outputs: {}
            }
        ]
    },
    footerType: 'node_nav',
    navs: [
        // {isPreviousButton: true, text: 'Prev', routerLink: ['../testNode3', {foo: 'zee'}]}
        {text: 'To Node2', routerLink: ['list'], onClick: (ev, inst, svc, route) => inst[0].doWork.emit({ev})},
        {text: 'To Node3', routerLink: ['testNode3', {foo: 'zee'}]}
    ]
}
