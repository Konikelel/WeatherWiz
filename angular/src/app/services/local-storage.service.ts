import {Injectable} from '@angular/core';
import ls from 'localstorage-slim';
import IStorageContainer from '../models/storage-container.model';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    getItem<Type>(key: string) {
        const container = ls.get<IStorageContainer<any>>(key, {encrypt: true});

        if (!container || container?.key != key) {
            return null
        }

        return container.value as Type;
    }

    setItem(key: string, value: any) {
        const container = this.createContainer(key, value);
        ls.set(key, container, {encrypt: true});
    }

    private createContainer<Type>(key: string, value: Type): IStorageContainer<Type> {
        return {value, key};
    }

}
