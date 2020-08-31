import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener,
  EventEmitter
} from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
// import { getActiveTheme, SetTheme, CloseAppMenu } from '@indigo/ux';

import { map, skipWhile, take } from 'rxjs/operators';
// import { AppMenuOverlayService } from './app-menu.service';

const ESCAPE = 27;
const ANIMATION_TIMINGS = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';

@Component({
  selector: 'flx-app-menu',
  templateUrl: 'app-menu.component.html',
  styleUrls: ['./app-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideContent', [
      state('void', style({ transform: 'translate3d(-25% ,0,0)', opacity: 0 })),
      state('enter', style({ transform: 'none', opacity: 1 })),
      state('leave', style({ transform: 'translate3d(-25%, 0,0)', opacity: 0 })),
      transition('* => *', animate(ANIMATION_TIMINGS))
    ])
  ]
})
export class FLXAppMenuComponent implements OnInit {
  @Input() opened = true;
  version: string;
  currentUser$: Observable<any>;
  themeCheckedStatus: boolean;
  theme = '';
  navItems;
  logo_url: any;
  animationState: 'void' | 'enter' | 'leave' = 'enter';
  animationStateChanged = new EventEmitter<AnimationEvent>();

  @HostListener('document:click', ['$event.target'])
  listenToClickOutsideMenu(targetElement) {}

  // @HostListener('document:keydown', ['$event']) private handleKeyDown(event: KeyboardEvent) {
  //   const key = event.key;
  //   if (key === 'Escape') {
  //     this.appMenuOverlayService.appMenuRef.close();
  //   }
  // }

  constructor(
    private router: Router,
    // private controller: ManifestController<any>,
    private _store: Store<any>,
    private cdr: ChangeDetectorRef,
    // private navService: NavService,
    // private bf: BigFormService // public appMenuOverlayService: AppMenuOverlayService
  ) {}

  ngOnInit() {
    // this.getOrg();
    // this.currentUser$ = this._store.select(getCurrentUser);
    // this.version = environment.version;

    // if (environment.branding) {
    //   this.logo_url = environment.branding.logo_url;
    // }

    // this._store
    //   .select(getActiveTheme)
    //   .pipe(take(1))
    //   .subscribe(value => {
    //     this.theme = value;
    //     // This should be done better. Need to look at making
    //     // more flexible in the future
    //     switch (value) {
    //       case 'midday':
    //         this.themeCheckedStatus = true;
    //         break;
    //       case 'blackout':
    //         this.themeCheckedStatus = false;
    //         break;
    //       default:
    //         this.themeCheckedStatus = false;
    //         break;
    //     }
    //   });
  }

  getOrg() {
    // this.controller
    //   .select(getActiveOrganization)
    //   .pipe(
    //     skipWhile(org => !org),
    //     take(1),
    //     map(org => org)
    //   )
    //   .subscribe(org => {
    //     org.appMenu(this, this._store).subscribe(menuItems => {
    //       this.navItems = menuItems;
    //     });
    //   });
  }

  // no more router link, this will let you do checks before navigating. which will eventually fold into actions which are dispatched to the router store
  redirect(navItem) {
    // this._store.dispatch(new CloseAppMenu());
    // switch (navItem.routerLink) {
    //   case '/workflow/detail': {
    //     if (navItem.name === 'New Claim') {
    //       this.bf.bigForm.reset();
    //       this._store.dispatch(new InitializeTempData());
    //       this.controller
    //         .select(getOrgKey)
    //         .pipe(take(1))
    //         .subscribe(key => {
    //           this.controller.dispatch(
    //             new SetActiveManifestItem({ pathToFlows: ['manifestItems'], orgKey: key, itemId: 'create_item_one' })
    //           );
    //           this.router.navigate([navItem.routerLink], { skipLocationChange: true });
    //         });
    //     } else {
    //       this.router.navigate([navItem.routerLink], { skipLocationChange: true });
    //     }
    //     break;
    //   }
    //   default: {
    //     this.router.navigate([navItem.routerLink], { skipLocationChange: true });
    //     break;
    //   }
    // }
  }

  toggleEditable(event) {
    // if (event.target.checked) {
    //   this._store.dispatch(new SetTheme({ name: 'midday' }));
    // } else {
    //   this._store.dispatch(new SetTheme({ name: 'blackout' }));
    // }
  }

  signout(event) {
    // event.preventDefault();
    // this.navService.portalActions.next({ call: '', paramFunc: () => {} });
    // this._store.dispatch(new LogOut());
    // this.cdr.detectChanges();
  }

  onAnimationStart(event: AnimationEvent) {
    this.animationStateChanged.emit(event);
  }

  onAnimationDone(event: AnimationEvent) {
    this.animationStateChanged.emit(event);
  }

  startExitAnimation() {
    this.animationState = 'leave';
  }
}
