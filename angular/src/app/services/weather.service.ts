import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpService } from './http.service';
import IWeatherCurrent from '../models/weather-current';
import IWeatherForecast from '../models/weather-forecast';
import AirPollution from '../models/air-pollution';

type IntervalType = 'days' | 'hours';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = environment.apiUrl;

  constructor(private _httpService: HttpService) {}

  async fetchCurrentWeather(city: string) {
    return await this._httpService.get<IWeatherCurrent>(
      '${this.apiUrl}/weather/current?city=${city}',
    );
  }

  async fetchForecastWeather(city: string, interval: IntervalType) {
    return await this._httpService.get<IWeatherForecast>(
      '${this.apiUrl}/weather/forecast?city=${city}&interval=${interval}',
    );
  }

  async fetchPollution(city: string) {
    return await this._httpService.get<AirPollution>(
      '${this.apiUrl}/pollution?city=${city}',
    );
  }
}
