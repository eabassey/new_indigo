
import * as TP from '@indigo/templates';
import {of} from 'rxjs';
import { NodeConfig } from '@wilo';


export const testNode3: NodeConfig = {
    id: 'testNode3',
    component: TP.FormRendererComponent,
    inputs: {
        formModel: [

            // new DynamicInputModel({

            //     id: 'sampleInput',
            //     label: 'Another Input',
            //     maxLength: 42,
            //     placeholder: 'Sample input'
            // }),

            // new DynamicRadioGroupModel<string>({

            //     id: 'sampleRadioGroup',
            //     label: 'Another Radio Group',
            //     options: [
            //         {
            //             label: 'Option 1',
            //             value: 'option-1',
            //         },
            //         {
            //             label: 'Option 2',
            //             value: 'option-2'
            //         },
            //         {
            //             label: 'Option 3',
            //             value: 'option-3'
            //         }
            //     ],
            //     value: 'option-3'
            // }),


            // new DynamicCheckboxModel({

            //     id: 'sampleCheckbox',
            //     label: 'I do agree again '
            // })
        ]
    },
    activateGuard: (svc, route) => {
        return of(true);
    },
    footerType: 'node_nav',
    navs: [
        {isPreviousButton: true, color: 'default', text: 'Prev', routerLink: ['../testNode2']},
    ]
};
