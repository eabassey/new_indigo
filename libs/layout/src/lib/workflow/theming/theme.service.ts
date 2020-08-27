import { Injectable, Inject, EventEmitter, RendererFactory2, Renderer2 } from '@angular/core';
import { THEMES, ACTIVE_THEME, Theme } from './symbols';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class ThemeService {
  themeChange = new EventEmitter<Theme>();
  renderer: Renderer2;
  constructor(
    private sanitizer: DomSanitizer,
    @Inject(THEMES) public themes: Theme[],
    private rendererFactory: RendererFactory2,
    @Inject(ACTIVE_THEME) public theme: string) {
      this.renderer = rendererFactory.createRenderer(null, null);
    }

  getTheme(name: string) {
    const theme = this.themes.find(t => t.name === name);
    if (!theme) {
      throw new Error(`Theme not found: ${name}`);
    }
    console.log({theme})
    return theme;
  }

  getActiveTheme() {
    return this.getTheme(this.theme);
  }

  setTheme(name?: string) {
    const themeToApply = name ? this.getTheme(name) : this.getTheme(this.theme);
    const el = document.getElementById('root-app');
    const allStyles = Object.entries(themeToApply.properties).reduce((acc: string, [key, value]) => {
      return acc.concat(`${key}: ${value};`);
    }, ``);
    console.log({allStyles});
    const safeStyles = this.sanitizer.bypassSecurityTrustStyle(allStyles);
    this.renderer.setProperty(el, 'style', safeStyles);
    // Object.keys(themeToApply.properties).forEach(k => {
    //   // document.documentElement.style = safeStyles;
    // });

    this.themeChange.emit(this.getActiveTheme());
  }
}
