import { Directive, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ThemeService } from './theme.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Theme } from './symbols';

@Directive({
  selector: '[theme]'
})
export class ThemeDirective implements OnInit, OnDestroy {
  private _destroy$ = new Subject();

  constructor(private _elementRef: ElementRef, private _theme: ThemeService) {}

  ngOnInit() {
    const active = this._theme.getActiveTheme();
    if (active) {
      this.updateTheme(active);
    }

    this._theme.themeChange
      .pipe(takeUntil(this._destroy$))
      .subscribe((theme: Theme) => this.updateTheme(theme));
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  updateTheme(theme: Theme) {
    for (const key in theme.properties) {
      this._elementRef.nativeElement.style.setProperty(
        key,
        theme.properties[key]
      );
    }

    //remove old theme
    for (const name of this._theme.theme) {
      this._elementRef.nativeElement.classList.remove(`${name}-theme`);
    }

    //alias element with theme name
    this._elementRef.nativeElement.classList.add(`${theme.name}-theme`);
  }
}
