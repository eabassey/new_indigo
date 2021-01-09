import { Directive, HostListener, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[hoverClickCopy]'
})

/*
 *****
 * Purpose: Directive to make data capturing more time-efficient
 * Dependencies: @indigo/shared, @angular/forms
 * Author: 4-Sure / Hardus Lourens / mulitiple
 * Date: 01:02.2019
 *
 */
export class HoverClickCopyDirective implements OnInit {
  selectedText: any;
  selected: any;
  copysuccess: boolean = false;
  _ElTypeMatch: boolean;
  dFrag: any;
  fragDiv: any;
  svgString = `
                    <div class="demo">
                    <svg width="15px" viewBox="0 0 24 24" class="svgInline" >
                    <path
                      d="M16,15H9V13h7v2m3-4H9V9H19v2m0-4H9V5H19V7M3,5V21H19v2H3a2,2,0,0,1-2-2V5H3M21,1a2,2,0,0,1,2,2V17a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V3A2,2,0,0,1,7,1H21M7,3V17H21V3Z"
                      transform="translate(-1 -1)"
                    />
                  </svg>
                    </div>

    `;
  divTxt: any;

  /**
   *  • check for valid HTML input to apply directive to
   *  • 'SPAN', 'P', 'DIV', 'LI' only valid objects until further notice
   *  • apply directive with 'hoverClickCopy'
   *  • Somewhat configurable at this stage with '[hoverClickCopy]'="'[color]'"
   */
  // =========================== INPUTS ================================== /

  @Input('hoverClickCopy') highlightColor!: string;
  @Input() defaultColor!: string;
  @Input() set override(x: any) {
    this._ElTypeMatch = x || true;
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {
    switch (el.nativeElement.tagName) {
      case 'SPAN':
      case 'P':
      case 'DIV':
      case 'LI':
        {
          this._ElTypeMatch = true;
        }
        break;
      default: {
        this._ElTypeMatch = false;
      }
    }
  }

  // ----------------------------- DOM EVENT HANDLERS ---------------------------------//

  /**
   *   • Directive makes use of DOM mouse event handlers to implement the functionality
   *   • use '_ElTypeMatch' flag to check the validity of the HTML the directive is being applied to
   *   • ONMOUSEENTER:
   *   • if not valid; displays error to developer in console log
   *   • if valid; invokes 'setId()' method to progammatically apply 'selectable' ID to element
   *   • ONMOUSELEAVE:
   *   • set highlight to 'null', effectively removing highlight color when user mouses off
   *   • invokes 'clearId()' method, removing programmatically set ID; allowing for selection of next element
   *     with directive applied
   */
  @HostListener('mouseenter') onmouseenter() {
    try {
      if (this._ElTypeMatch === false) {
        throw new Error('error: you must have the attribute applied to a valid HTML element');
      }
      this.highlight(this.highlightColor || 'rgb(1, 72, 73)');
      this.setId();
    } catch (e) {}
    return;
  }
  @HostListener('mouseleave') onmouseleave() {
    if (this._ElTypeMatch === false) {
      return;
    }
    this.highlight('');
    this.clearId();
  }
  @HostListener('mouseup') onmouseup() {
    if (this._ElTypeMatch === false) {
      return;
    }
    this.selected = this.selectText(document.getElementById('selectable'));
    this.selectedText = this.getSelectionText();
  }

  // ----------------------------------  PRIVATE INTERNAL METHODS -------------------------------- /
  /**
   *   •  directive utilises various 'window' and 'document' methods to get selection and copy contents of selected area
   */

  private getSelectionText() {
    if (window.getSelection) {
      this.selectedText = window?.getSelection()?.toString()
        .trim();
      this.selected = this.copySelectedText();
    }
  }
  private copySelectedText() {
    try {
      this.copysuccess = document.execCommand('copy');
    } catch (e) {
      this.copysuccess = false;
    }
    return this.copysuccess;
  }
  private selectText(element: any) {
    if (/INPUT|TEXTAREA/i.test(element.tagName)) {
      element.focus();
      if (element.setSelectionRange) {
        element.setSelectionRange(0, element.value.length);
      } else {
        element.select();
      }
      return;
    }
    if (window.getSelection) {
      window?.getSelection()?.selectAllChildren(element);
    }
  }
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
  private setId() {
    if (this.el.nativeElement.hasAttribute('hoverClickCopy' || '[hoverClickCopy]')) {
      this.el.nativeElement.id = 'selectable';
    }
  }
  private clearId() {
    this.el.nativeElement.id = '';
  }
  private addSVG(htmlStr: string) {
    if (this.el.nativeElement.hasAttribute('hoverClickCopy' || '[hoverClickCopy]')) {
      this.renderer.setAttribute(this.el.nativeElement, 'data-tooltip', '  Click to Copy  ');
      this.fragDiv = this.renderer.createElement('div');
      this.fragDiv.innerHTML = htmlStr;
      this.renderer.appendChild(this.el.nativeElement, this.fragDiv);
    }
  }
  ngOnInit() {
    this.addSVG(this.svgString);
  }
}
