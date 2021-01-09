import { Component, OnInit, Input } from '@angular/core';
import { CoreServices } from '../services/core.services';
import { FooterButtonConfig, StateConfig, NodeConfig } from '../models';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';


@Component({template: ''})
export abstract class NodeFooterBase implements OnInit {
    @Input() navs: FooterButtonConfig[] = [];
    @Input() compInstances!: any[];

    //
    // toMain: FlexusNodeNav = {
    //     text: 'Back to workflow',
    //     routerLink: []
    // };

    //
    // previous: FlexusNodeNav = {
    //     text: 'Previous',
    //     routerLink: [],
    //     visible: (svc, route) => {
    //         return route.parent.data.pipe(
    //             switchMap((flow: FlexusState) => {
    //                 const startNode = flow.startNode;
    //                 return route.data.pipe(
    //                     map((node: FlexusNode) => {
    //                         return startNode !== node.id;
    //                     })
    //                 );
    //             })
    //         );
    //     }
    // };

    constructor(private svc: CoreServices, private route: ActivatedRoute) {}

    ngOnInit() {
    }


}
