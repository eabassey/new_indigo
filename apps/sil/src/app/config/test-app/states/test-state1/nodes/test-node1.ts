import * as TP from '@indigo/templates';
// import {FormModel} from 'src/app/dyn-form/core/models/form-model'
// import {InputControlModel} from 'src/app/dyn-form/core/models/input-control-model';
// import {FormGroupModel} from 'src/app/dyn-form/core/models/form-group-model';
// import { DynFormComponent } from 'src/app/dyn-form/components';
import { NodeConfig } from '@wilo';


export const testNode1: NodeConfig = {
    id: 'testNode1',
    component: {
        children: [
            {
                component: TP.Node1Component,
                inputs: { greeting: 'Hello component DRET'},
                outputs: {
                    doWork: (ev, sv) => {
                        // console.log('Node Event....: ', {ev, sv})
                    }
                }
            },
            {component: TP.Node2Component, inputs: {}, outputs: {}},
            // {
            //     component: DynFormComponent,
            //     inputs: {
            //         formModel: new FormModel({
            //             classes: 'row',
            //             controls: [
            //                 new InputControlModel({
            //                     name: 'firstName',
            //                     label: 'First Name',
            //                     inputType: 'text',
            //                     placeholder: 'First name',
            //                     controlGroupClasses: 'col',
            //                     controlClasses: 'form-control',
            //                     validators: {required: {}}
            //                 }),
            //                 new InputControlModel({
            //                     name: 'lastName',
            //                     label: 'Last Name',
            //                     inputType: 'text',
            //                     placeholder: 'Last name',
            //                     controlGroupClasses: 'col',
            //                     controlClasses: 'form-control'
            //                 }),
            //                 new InputControlModel({
            //                     name: 'dob',
            //                     label: 'Birthdate',
            //                     inputType: 'date',
            //                     placeholder: 'Date of birth',
            //                     controlGroupClasses: 'col',
            //                     controlClasses: 'form-control tatenda'
            //                 }),

            //                 new FormGroupModel({
            //                     name: 'inner',
            //                     classes: 'row',
            //                     controls: [
            //                         new InputControlModel({
            //                             name: 'firstName1',
            //                             label: 'First Name1',
            //                             inputType: 'text',
            //                             placeholder: 'First name',
            //                             controlGroupClasses: 'col',
            //                             controlClasses: 'form-control'
            //                         }),
            //                         new InputControlModel({
            //                             name: 'lastName1',
            //                             label: 'Last Name1',
            //                             inputType: 'text',
            //                             placeholder: 'Last name',
            //                             controlGroupClasses: 'col',
            //                             controlClasses: 'form-control'
            //                         }),
            //                         new InputControlModel({
            //                             name: 'midName1',
            //                             label: 'Mid Name1',
            //                             inputType: 'text',
            //                             placeholder: 'Mid name',
            //                             controlGroupClasses: 'col',
            //                             controlClasses: 'form-control'
            //                         }),

            //                         new FormGroupModel({
            //                             name: 'inner2',
            //                             classes: 'row',
            //                             controls: [
            //                                 new InputControlModel({
            //                                     name: 'firstName2',
            //                                     label: 'First Name2',
            //                                     inputType: 'text',
            //                                     placeholder: 'First name',
            //                                     controlGroupClasses: 'col',
            //                                     controlClasses: 'form-control'
            //                                 }),
            //                                 new InputControlModel({
            //                                     name: 'lastName2',
            //                                     label: 'Last Name2',
            //                                     inputType: 'text',
            //                                     placeholder: 'Last name',
            //                                     controlGroupClasses: 'col',
            //                                     controlClasses: 'form-control'
            //                                 }),
            //                                 new InputControlModel({
            //                                     name: 'midName2',
            //                                     label: 'Mid Name2',
            //                                     inputType: 'text',
            //                                     placeholder: 'Mid name',
            //                                     controlGroupClasses: 'col',
            //                                     controlClasses: 'form-control'
            //                                 })
            //                             ]
            //                         })
            //                     ]
            //                 })
            //             ]
            //         })
            //         // formModel: [

            //         //     // new DynamicDatePickerModel({

            //         //     //     id: 'arrivalDate',
            //         //     //     inline: false,
            //         //     //     label: 'Arrival',
            //         //     //     placeholder: 'Date of Arrival'
            //         //     // }),
            //         //     // new DynamicInputModel({

            //         //     //     id: 'sampleInput1',
            //         //     //     label: 'Prove Input',
            //         //     //     maxLength: 42,
            //         //     //     placeholder: 'Proooove'
            //         //     // }),
            //         // ]
            //     },
            //     outputs: {}
            // }
        ]
    },
    footerType: 'node_nav',
    navs: [
        // {isPreviousButton: true, text: 'Prev', routerLink: ['../testNode3', {foo: 'zee'}]}
        {text: 'To Node2', color: 'default', routerLink: ['../testNode2'], onClick: (ev, inst, svc, route) => console.log({inst})},
        {text: 'To Node3', color: 'default', routerLink: ['../testNode3']}
    ]
}
