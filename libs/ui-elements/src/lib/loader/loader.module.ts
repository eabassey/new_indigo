import { NgModule } from '@angular/core';
import { FLXLoaderComponent } from './loader.component';
import { CommonModule } from '@angular/common';
import { FLXLoadingSpinnerModule } from '../loading-spinner';
import { FLXLoadingSpinnerInlineModule } from '../loading-spinner-inline';

@NgModule({
  imports: [CommonModule, FLXLoadingSpinnerModule, FLXLoadingSpinnerInlineModule],
  declarations: [FLXLoaderComponent],
  exports: [FLXLoaderComponent]
})
export class FLXLoaderModule {}
