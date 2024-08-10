import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpService } from './http.service';
import IWeatherCurrent from '../models/weather-current.module';
import IWeatherForecast from '../models/weather-forecast.module';

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
  private _apiUrl = environment.apiUrl;

  constructor(private _httpService: HttpService) {
    const weatherCurrent = localStorage.getItem("weatherCurrent");
    if (weatherCurrent) {
      this.weatherCurrent.set(JSON.parse(weatherCurrent));
    }

    const weatherForecastDays = localStorage.getItem("weatherForecastDays");
    if (weatherForecastDays) {
      this.weatherForecastDays.set(JSON.parse(weatherForecastDays));
    }

    const weatherForecastHours = localStorage.getItem("weatherForecastHours");
    if (weatherForecastHours) {
      this.weatherForecastHours.set(JSON.parse(weatherForecastHours));
    }
  }

  async fetchWeatherData(city: string) {
    await this.fetchWeatherCurrent(city);
    await this.fetchWeatherForecast(city, 'days');
    await this.fetchWeatherForecast(city, 'hours');
    // await this.fetchPollution(city);
  }

  async fetchWeatherCurrent(city: string) {
    const response = await this._httpService.get<IWeatherCurrent>(
      `${this._apiUrl}/weather/current?city=${city}`,
    );

    if (response.ok) {
      this.weatherCurrent.set(response.object);
      localStorage.setItem("weatherCurrent", JSON.stringify(response.object));
    }
  }

  async fetchWeatherForecast(city: string, interval: IntervalType) {
    const response = await this._httpService.get<IWeatherForecast[]>(
      `${this._apiUrl}/weather/forecast?city=${city}&interval=${interval}`,
    );

    if (response.ok) {
      if (interval === 'days') {
        this.weatherForecastDays.set(response.object);
        localStorage.setItem("weatherForecastDays", JSON.stringify(response.object));
      } else {
        this.weatherForecastHours.set(response.object);
        localStorage.setItem("weatherForecastHours", JSON.stringify(response.object));
      }
    }
  }
}
