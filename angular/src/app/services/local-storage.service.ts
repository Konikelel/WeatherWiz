import { Injectable } from '@angular/core';
import ls from 'localstorage-slim';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getItem<Type>(key: string) {
    return ls.get<Type>(key, { encrypt: true });
  }

  setItem(key: string, value: any) {
    ls.set(key, value, { encrypt: true });
  }
}
