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
import { KeyValueStoreService } from './key-value-store.service';
import { EventEmitter } from 'events';
import { ConfigAccessorService } from './config-accessor.service';
import * as jQuery from 'jquery';
import { addFilter, getSubmissionData, getVariable, removeFilter, resetFilter, setVariable, updateSubmissionData } from '../store';
import { LocalStorageService } from './local-storage.service';
import { TemplateParserService } from './template-parser.service';


@Injectable({providedIn: 'root'})
export class CoreServices {
    data: {[id: string]: any};
    eventBus: EventEmitter;
    window: Window;
    console: Console;
    actions = {
      //  setVariable: (payload: {key: string; data: any}) => this.store.dispatch(setVariable(payload)),
      //  addFilter: () => this.store.dispatch(addFilter),
      //  removeFilter,
      //  resetFilter,
       updateSubmissionData: (payload: any) => this.store.dispatch(updateSubmissionData(payload))
    };
    selectors = {
      getVariable: (prop) => this.store.select(getVariable(prop)),
      getSubmissionData: () => this.store.select(getSubmissionData)
    }
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
        public keyValueStore: KeyValueStoreService,
        public footerAccessor: FooterAccessorService,
        public headerAcessor: HeaderAccessorService,
        public configAccessor: ConfigAccessorService,
        public templateParser: TemplateParserService,
        public localStorage: LocalStorageService,
        @Inject(BASE_URL) public baseUrl: string,
        @Inject(CLIENT_CONFIG) public clientConfig: ClientConfig,
        @Inject(CLIENT_SERVICE) public clientService: any
    ) {
      this.data = {};
      this.window = window;
      this.console = console;
      this.eventBus = new EventEmitter();
      this.bf.initCoreService(this);
    }

    get $ () {
      return jQuery;
    }
}
