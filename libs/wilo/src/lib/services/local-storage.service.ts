import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})
export class LocalStorageService {

  getItem(key: string) {
    const itemStr = window.localStorage.getItem(key);
    return itemStr.startsWith("{") ? JSON.parse(itemStr) : itemStr;
  }
}
