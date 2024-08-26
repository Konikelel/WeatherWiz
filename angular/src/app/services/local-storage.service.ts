import {Injectable} from '@angular/core';
import ls from 'localstorage-slim';
import IStorageContainer from '../models/storage-container.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private _defaultDurationTime = 1000 * 60 * 60; // 1 hour

  getItem<Type>(key: string) {
    const container = ls.get<IStorageContainer<any>>(key, {encrypt: true});

    if (!container || container?.key != key || !container?.expiresAt || container.expiresAt < Date.now()) {
      return null
    }

    return container.value as Type;
  }

  setItem(key: string, value: any) {
    const container = this.createContainer(key, value);
    ls.set(key, container, {encrypt: true});
  }

  private createContainer<Type>(key: string, value: Type, duration: number | null = this._defaultDurationTime): IStorageContainer<Type> {
    return {value, key, expiresAt: duration ? Date.now() + duration : null};
  }

}
