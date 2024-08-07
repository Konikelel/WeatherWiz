import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpService } from './http.service';
import IWeatherCurrent from '../models/weather-current.module';
import IWeatherForecast from '../models/weather-forecast.module';
import IAirPollution from '../models/air-pollution.module';

type IntervalType = 'days' | 'hours';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  public weatherCurrent = signal<IWeatherCurrent | undefined>(undefined);
  public weatherForecast = signal<IWeatherForecast | undefined>(undefined);
  public pollution = signal<IAirPollution | undefined>(undefined);
  private apiUrl = environment.apiUrl;

  constructor(private _httpService: HttpService) {}

  async fetchCurrentWeather(city: string) {
    const response = await this._httpService.get<IWeatherCurrent>(
      '${this.apiUrl}/weather/current?city=${city}',
    );

    if (response.ok) {
      this.weatherCurrent.set(response.object);
    }
  }

  async fetchForecastWeather(city: string, interval: IntervalType) {
    const response = await this._httpService.get<IWeatherForecast>(
      '${this.apiUrl}/weather/forecast?city=${city}&interval=${interval}',
    );

    if (response.ok) {
      this.weatherForecast.set(response.object);
    }
  }

  async fetchPollution(city: string) {
    const response = await this._httpService.get<IAirPollution>(
      '${this.apiUrl}/pollution?city=${city}',
    );

    if (response.ok) {
      this.pollution.set(response.object);
    }
  }
}
