import { NgModule } from '@angular/core';
import { Node1Component } from './node1.component';
import { Node2Component } from './node2.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormRendererComponent } from './form-renderer.component';
import {MainListComponent} from './main-list/main-list.component';
import { SilClaimCardComponent } from './main-list/sil-claim-card/sil-claim-card.component';
import { SilJobCardComponent } from './main-list/sil-job-card/sil-job-card.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import {UIElementsModule} from '@indigo/ui-elements';


const components = [
    Node1Component,
    Node2Component,
    FormRendererComponent,
    MainListComponent
];
@NgModule({
    declarations: [...components, SilClaimCardComponent, SilJobCardComponent],
    exports: [...components],
    imports: [CommonModule, UIElementsModule.forRoot({environment: ''}),  RouterModule, ReactiveFormsModule, NgxPaginationModule]
})
export class TemplatesModule {}
