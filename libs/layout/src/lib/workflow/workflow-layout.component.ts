import { Component, ViewEncapsulation, Inject, HostBinding, Renderer2, PLATFORM_ID } from '@angular/core';
import { CoreServices } from '@wilo';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { THEMES, ACTIVE_THEME, Theme } from './theming/symbols';
import { isPlatformBrowser } from '@angular/common';
import { ClientConfigBase } from '@wilo';
import { AppConfig, StateConfig, NodeConfig, ClientConfig } from '@wilo';


@Component({
    selector: 'workflow-layout',
    template: `
      <!-- <h1>Workflow layouter</h1>
      <h1>{{user | json }}</h1>
      <h2 *ngIf="loading$ | async">Busy Loading....................................</h2> -->
      <router-outlet></router-outlet>
      <!-- <workflow-app [app]="app" [state]="state" [node]="node"></workflow-app> -->
    `,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['workflow-layout.component.scss']
})
export class WorkflowLayoutComponent extends ClientConfigBase {
    isAuthenticated: boolean;
    user;

    constructor(
                svc: CoreServices,
                route: ActivatedRoute,
                private renderer: Renderer2,
                @Inject(PLATFORM_ID) platformId: any,
                @Inject(THEMES) public themes: Theme[],
                @Inject(ACTIVE_THEME) public theme: string) {
        super(svc, route);

        if (isPlatformBrowser(platformId)) {
          const htmlEl = document.getElementById('root-app');
          renderer.setProperty(htmlEl, 'style', this.style);
        }
    }

    get style() {
      const allStyles = Object.entries(this.getTheme('blackout').properties).reduce((acc: string, [key, value]) => {
        return acc.concat(`${key}: ${value};`);
      }, ``);
      return allStyles;
    }

    getTheme(name: string) {
      const theme = this.themes.find(t => t.name === name);
      if (!theme) {
        throw new Error(`Theme not found: ${name}`);
      }
      return theme;
    }
}
