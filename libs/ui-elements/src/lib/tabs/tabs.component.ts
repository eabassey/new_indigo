import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  AfterViewInit,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { cleanUpSub } from '@indigo/utilities';

export interface TabsData {
  display: string;
  targetId: string;
  show?: boolean;
}

/* USE Example:
  Build a tab config with tab names and target ids:
  tabConfig: TabsData[] = [
      {
        display: 'test 1',
        targetId: 'test1',
        show: true,
      },
      {
        display: 'test 2',
        targetId: 'test2',
        show: true,
      },
    ];

  Put content in in tab element. Give each content section an target ID and class called 'tab-content'
  <flx-tabs [config]="tabConfig">
    <div id="test1" class="tab-content">A</div>
    <div id="test2" class="tab-content">B</div>
  </flx-tabs>
*/

@Component({
  selector: 'flx-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class FLXTabsComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() tabs: TabsData[] = null;
  @Input() externalPages = true;
  @Input() defaultTab: string = null; // TODO

  // an observable is used if you want to keep track of the current component
  @Input() currentStep$: Observable<any> = null;
  currentStepSub: Subscription;

  @Output() outputEventStream: EventEmitter<any> = new EventEmitter();

  constructor(private cd: ChangeDetectorRef) {}

  findTab(comp: string) {
    this.tabs.forEach(tab => {
      if (tab.targetId === comp) {
        this.setActive(tab.targetId + 'tab');
      }
    });
  }

  setDefault() {
    let tabIndex = 0;
    while (this.tabs[tabIndex].show !== true && tabIndex !== this.tabs.length - 1) {
      tabIndex++;
    }
    // console.log('Setting Default tab ' + this.tabs[tabIndex].display);
    this.switchTab(this.tabs[tabIndex].targetId + 'tab', this.tabs[tabIndex].targetId);
  }

  switchTab(tabName: any, target: string, tabIndex?: number) {
    this.setActive(tabName);
    if (!this.externalPages) {
      // Hide tab content
      const pages = document.getElementsByClassName('tab-content');
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i] as HTMLElement;
        page.style.display = 'none';
      }
      if (target !== 'default') {
        document.getElementById(target).style.display = 'block';
      } else {
        const def = pages[0] as HTMLElement;
        def.style.display = 'block';
      }
    }

    if (this.outputEventStream) {
      this.outputEventStream.emit({ index: tabIndex, target: target });
    }
  }

  setActive(tabName: any) {
    if (!!tabName) {
      // Deactivate all tab links
      const tabs = document.getElementsByClassName('tab-link');
      for (let i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(' active', '');
      }
      // activate current
      const x = document.getElementById(tabName);
      if (!!x) {
        // console.log({ SettingActiveTab: x.className });
        x.className += ' active';
      }
    }
  }

  ngOnInit() {
    // console.log({ TABS: this.tabs });
  }

  ngAfterViewInit(): void {
    if (this.externalPages) {
      document.getElementById(this.tabs[0].targetId + 'tab').className += ' active';
      if (this.currentStep$ !== null) {
        this.currentStepSub = this.currentStep$.subscribe(step => {
          this.findTab(step);
        });
      }
    } else {
      this.setDefault();
    }

    this.cd.detectChanges();
  }

  ngOnDestroy() {
    cleanUpSub(this.currentStepSub);
  }
}
