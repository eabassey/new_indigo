import { FormsModule } from '@angular/forms';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import * as fromDirectives from './directives';
import { FLXFormsModule } from '../forms.module';

export * from './models';
// @NgModule({
//   imports: [FLXFormsModule],
//   exports: [...fromDirectives.directives],
//   declarations: [...fromDirectives.directives]
//   // schemas: [NO_ERRORS_SCHEMA]
// })
// export class FLXDragDropModule {}
