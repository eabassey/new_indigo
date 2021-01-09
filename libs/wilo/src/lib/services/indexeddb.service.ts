import { Injectable, Inject } from '@angular/core';
import Dexie from 'dexie';
import { INDEXED_DB_NAME } from './constants';


@Injectable({providedIn: 'root'})
export class IndexedDbService extends Dexie {
    endpointStore: {[id: string]: any}= {};
    // contacts: Dexie.Table<any, number>;
    constructor (@Inject(INDEXED_DB_NAME) databaseName: string) {
        super(databaseName);
        this.version(1).stores({items: 'uuid'});
        // Open it
        this.open().catch(err => {
            console.error(`Open failed: ${err.stack}`);
        });
        // this.contacts = this.table('contacts'); // Just informing Typescript what Dexie has already done...
    }

    registerEndpoints(endpoint: string, callback: () => any) {
        this.endpointStore[endpoint] = callback;
    }

    get(url: string) {
        const cb = this.endpointStore[url];
        return cb();
    }
}