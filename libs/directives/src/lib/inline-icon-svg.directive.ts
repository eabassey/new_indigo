import { Directive, ElementRef, OnInit, OnChanges, Input, HostBinding } from '@angular/core';
// - We use the HTTP Client to GET the SVG as text
import { HttpClient } from '@angular/common/http';

@Directive({
  selector: '[inline-icon-svg]'
})
export class InlineIconSvgDirective implements OnInit, OnChanges {
  constructor(private elementRef: ElementRef, private http: HttpClient) {}
  // Get svg name from directive attr
  @Input('inline-icon-svg') filename: string;
  // on init assign file name to var and GET via HTTP client
  ngOnInit() {
    let svgTxt = this.http.get(`/assets/icons/${this.filename}.svg`, {
      responseType: 'text'
    });
    svgTxt.subscribe(
      SVGtxt => {
        this.elementRef.nativeElement.innerHTML = SVGtxt;
      },
      err => {
        if (err.status === 404) {
          return false;
        }
      }
    );
  }

  ngOnChanges() {}
}
