import { Injectable } from '@angular/core';



@Injectable({providedIn: 'root'})
export class KeyValueStoreService {
  private store = {};

  getItem(key: string) {
    return this.store[key];
  }

  setItem(key: string, value: any) {
    this.store[key] = value;
  }

  removeItem(key: string) {
    delete this.store[key];
  }

  resetStore() {
    this.store = {};
  }
}
