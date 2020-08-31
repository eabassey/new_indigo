import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FLXFileViewerComponent } from './file-viewer.component';

@NgModule({
  declarations: [FLXFileViewerComponent],
  imports: [CommonModule],
  exports: [FLXFileViewerComponent],
  entryComponents: [FLXFileViewerComponent],
})
export class FLXFileViewerModule {}
