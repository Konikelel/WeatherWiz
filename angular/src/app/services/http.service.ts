import { Injectable } from '@angular/core';
import IResponse from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  async get<Type>(url: string): Promise<IResponse<Type>> {
    const response = await fetch(url);
    const object = (await response.json()) as Type;

    if (!response.ok) {
      console.log(`Error fetching data: ${response}`);
    }

    return {
      object,
      ok: response.ok,
      status: response.status,
    };
  }
}
