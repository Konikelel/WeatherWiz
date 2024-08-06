import { Injectable } from '@angular/core';
import IResponse from '../models/response';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  async get<Type>(url: string): Promise<IResponse<Type>> {
    const response = await fetch(url);
    const object = (await response.json()) as Type;

    return {
      ...response,
      object,
    };
  }
}
