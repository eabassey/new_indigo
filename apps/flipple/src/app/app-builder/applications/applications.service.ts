import {Injectable} from '@angular/core';
import { ClientConfig } from '@wilo';


@Injectable({providedIn: 'root'})
export class ApplicationsService {
    applications = [
        {id: '123', name: 'Test App', routeKey: 'testApp'}
    ];

    constructor() {}

    getConfig() {
      return fetch('http://localhost:3434/config').then(res => res.json());
    }

    getApp(id: string) {
      // later make true rest call to prevent overfetching
      return this.getConfig().then((config: ClientConfig) => config.apps[id]);
    }
}
