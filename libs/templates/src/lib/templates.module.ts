import { NgModule } from '@angular/core';
import { Node1Component } from './node1.component';
import { Node2Component } from './node2.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormRendererComponent } from './form-renderer.component';
import {MainListComponent} from './main-list/main-list.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import {UIElementsModule} from '@indigo/ui-elements';
import { ItemOneCardComponent } from './main-list/item-one-card/item-one-card.component';
import { ItemTwoCardComponent } from './main-list/item-two-card/item-two-card.component';
import { SearchComponent } from './search.component';


const components = [
    Node1Component,
    Node2Component,
    FormRendererComponent,
    MainListComponent,
    SearchComponent
];
@NgModule({
    declarations: [...components, ItemOneCardComponent, ItemTwoCardComponent],
    exports: [...components, ReactiveFormsModule],
    imports: [CommonModule, UIElementsModule.forRoot({environment: ''}),  RouterModule, ReactiveFormsModule, NgxPaginationModule]
})
export class TemplatesModule {}
