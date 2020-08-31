import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FLXGeneralNoteComponent } from './general-note/general-note.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FLXGeneralNoteComponent],
  exports: [FLXGeneralNoteComponent],
})
export class FLXNotesModule {}
