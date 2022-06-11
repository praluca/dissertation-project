import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  localStorage: Storage;
  changes$ = new Subject();

  constructor() {
    this.localStorage = window.localStorage;
  }
  isSet(key: string): boolean {
    if (this.isLocalStorageSupported && this.localStorage.getItem(key)) {
      //TODO: changed strict property from tsconfig in order to have this working
      return !!JSON.parse(this.localStorage.getItem(key) || '');
    }
    return false;
  }
  get(key: string): any {
    if (this.isLocalStorageSupported && this.localStorage.getItem(key)) {
      return JSON.parse(this.localStorage.getItem(key) || '');
    }
    return null;
  }
  set(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));
      this.changes$.next({
        type: 'set',
        key,
        value,
      });
      return true;
    }
    return false;
  }
  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);
      this.changes$.next({
        type: 'remove',
        key,
      });
      return true;
    }
    return false;
  }
  get isLocalStorageSupported(): boolean {
    return !!this.localStorage;
  }
}
