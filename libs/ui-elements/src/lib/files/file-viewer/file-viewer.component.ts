import { Component, ViewChild, ElementRef, Input, Renderer2, OnChanges, AfterViewInit, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { skipWhile, take } from 'rxjs/operators';

export interface FileViewerConfig {
  displayArrows?: boolean;
  containerHeight?: string;
  styles?: { [id: string]: string };
}

export const defaultConfig: FileViewerConfig = {
  displayArrows: false,
  containerHeight: '99.7%',
};

@Component({
  selector: 'flx-file-viewer',
  templateUrl: 'file-viewer.component.html',
  styleUrls: ['file-viewer.component.scss'],
})
export class FLXFileViewerComponent implements OnChanges, AfterViewInit, OnInit, OnDestroy {
  @Input() data$: Observable<any>;

  @Input() source;
  @Input() base64Source$: Observable<string> = null;
  base64Subscription: Subscription;
  @Input() base64Source: string;
  @Input() containerHeight = '400px'; // default height
  @Input() mimeType: string;
  @Input() styles: { [id: string]: string };
  @Input() displayArrows = false;
  @Input() margin: string;

  @ViewChild('file', { read: ElementRef, static: false })
  file: ElementRef;

  @ViewChild('fileContainer', { read: ElementRef, static: false })
  fileContainer: ElementRef;

  constructor(private renderer: Renderer2, private _sanitizer: DomSanitizer) {}

  ngOnInit() {}

  ngOnChanges(): void {
    if (this.base64Subscription) this.base64Subscription.unsubscribe();
    if (this.base64Source$ !== null) {
      this.base64Source$
        .pipe(
          skipWhile((x: any) => !x),
          take(1),
        )
        .subscribe((data: any) => {
          this.base64Source = data;
          // console.log({ base64: this.base64Source });
          this.updateChanges();
        });
    } else {
      this.updateChanges();
    }
  }

  ngAfterViewInit(): void {
    this.updateChanges();
  }

  updateFileDetails(): void {
    const blob = this.base64StringtoBlob(this.base64Source, this.mimeType.includes('pdf') ? 'application/pdf' : 'image/jpg');
    if (this.mimeType === 'pdf') {
      this.source = URL.createObjectURL(blob);
      this.initiatePDF();
    } else {
      this.source = this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
    }
  }

  updateChanges() {
    switch (this.mimeType) {
      case 'application/pdf':
        this.base64Source = this.base64Source.replace(/^data:.*?;base64,/, '');
        this.mimeType = 'pdf';
        break;
      case 'image/tiff':
        this.mimeType = 'tiff';
        break;
      case 'image/jpeg':
      case 'image/jpg':
      case 'image/png':
        this.source = this.base64Source;
        this.mimeType = 'image';
        break;
      default:
        break;
    }

    if (this.base64Source && this.file) {
      this.updateFileDetails();
    } else if (this.base64Source && this.mimeType !== 'pdf') {
      this.updateFileDetails();
    }
  }

  initiatePDF() {
    if (this.source && this.mimeType === 'pdf') {
      const fileElement: HTMLObjectElement = this.file.nativeElement;
      const fileContainerElement: HTMLDivElement = this.fileContainer.nativeElement;

      fileElement.data = this.source;

      if (this.styles) {
        Object.keys(this.styles).map((key) => {
          this.renderer.setStyle(fileContainerElement, key, this.styles[key]);
        });
      }
    }
  }

  base64StringtoBlob(b64Data, contentType = '', sliceSize = 512): Blob {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }

  ngOnDestroy() {
    if (this.base64Subscription) this.base64Subscription.unsubscribe();
  }
}
