import { NgModule } from '@angular/core';
import { Node1Component } from './node1.component';
import { Node2Component } from './node2.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormRendererComponent } from './form-renderer.component';
import { RouterModule } from '@angular/router';
import {UIElementsModule} from '@indigo/ui-elements';
import { SearchComponent } from './search.component';
// import { SearchFilterComponent } from './search-filter.component';
import { PipesModule } from '@indigo/pipes';


const components = [
    Node1Component,
    Node2Component,
    FormRendererComponent,
    SearchComponent,
    // SearchFilterComponent
];
@NgModule({
    declarations: [...components],
    exports: [...components, ReactiveFormsModule],
    imports: [CommonModule, PipesModule, UIElementsModule.forRoot({environment: ''}),  RouterModule, ReactiveFormsModule]
})
export class TemplatesModule {}
