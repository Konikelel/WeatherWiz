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
  public weatherForecastDays = signal<IWeatherForecast[] | undefined>(
    undefined,
  );
  public weatherForecastHours = signal<IWeatherForecast[] | undefined>(
    undefined,
  );
  public pollution = signal<IAirPollution | undefined>(undefined);
  private _apiUrl = environment.apiUrl;

  constructor(private _httpService: HttpService) {}

  async clearWeatherData() {
    this.weatherCurrent.set(undefined);
    this.weatherForecastDays.set(undefined);
    this.weatherForecastHours.set(undefined);
    this.pollution.set(undefined);
  }

  async fetchWeatherData(city: string) {
    await this.fetchCurrentWeather(city);
    await this.fetchForecastWeather(city, 'days');
    await this.fetchForecastWeather(city, 'hours');
    await this.fetchPollution(city);
  }

  async fetchCurrentWeather(city: string) {
    const response = await this._httpService.get<IWeatherCurrent>(
      `${this._apiUrl}/weather/current?city=${city}`,
    );

    if (response.ok) {
      this.weatherCurrent.set(response.object);
    }
  }

  async fetchForecastWeather(city: string, interval: IntervalType) {
    const response = await this._httpService.get<IWeatherForecast[]>(
      `${this._apiUrl}/weather/forecast?city=${city}&interval=${interval}`,
    );

    if (response.ok) {
      if (interval === 'days') {
        this.weatherForecastDays.set(response.object);
      } else {
        this.weatherForecastHours.set(response.object);
      }
    }
  }

  async fetchPollution(city: string) {
    const response = await this._httpService.get<IAirPollution>(
      `${this._apiUrl}/pollution?city=${city}`,
    );

    if (response.ok) {
      this.pollution.set(response.object);
    }
  }
}
