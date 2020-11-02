import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})
export class LocalStorageService {

  setItem = window.localStorage.setItem;
  removeItem = window.localStorage.removeItem;
  key = window.localStorage.key;
  clear = window.localStorage.clear;
  getItem(key: string) {
    const itemStr = window.localStorage.getItem(key);
    return itemStr.startsWith("{") ? JSON.parse(itemStr) : itemStr;
  }

}
