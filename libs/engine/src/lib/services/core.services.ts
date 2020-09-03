import { Injectable, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ModalService } from './modal.service';
import { NavService } from './nav.service';
import { StoreQuery } from './store-query.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CLIENT_SERVICE, BASE_URL, CLIENT_CONFIG } from './constants';
import { Store } from '@ngrx/store';
import { LoaderService } from './loader.service';
import { AuthService } from './auth.service';
import { ActionPanelService } from './action-panel.service';
import { FooterAccessorService } from './footer-accessor.service';
import { HeaderAccessorService } from './header-accessor.service';
import { IndexedDbService } from './indexeddb.service';
import { BigFormService } from './big-form.service';
import { ClientConfig } from '../models';


@Injectable({providedIn: 'root'})
export class CoreServices {
    constructor(
        public bf: BigFormService,
        public http: HttpClient,
        public modal: ModalService,
        public nav: NavService,
        public sq: StoreQuery,
        public router: Router,
        public route: ActivatedRoute,
        public store: Store<any>,
        public loader: LoaderService,
        public auth: AuthService,
        public indexedDb: IndexedDbService,
        public actionPanel: ActionPanelService,
        public footerAccessor: FooterAccessorService,
        public headerAcessor: HeaderAccessorService,
        @Inject(BASE_URL) public baseUrl: string,
        @Inject(CLIENT_CONFIG) public clientConfig: ClientConfig,
        @Inject(CLIENT_SERVICE) public clientService: any
    ) {}
}
