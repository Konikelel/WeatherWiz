import {Injectable, signal} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpService} from './http.service';
import {LocalStorageService} from './local-storage.service';
import IWeatherCurrent from '../models/weather-current.model';
import IWeatherForecast from '../models/weather-forecast.model';
import ICity from "../models/city.model";

type IntervalType = 'days' | 'hours';

@Injectable({
    providedIn: 'root',
})
export class WeatherService {
    public weatherCurrent = signal<IWeatherCurrent | undefined>(undefined);
    public weatherForecastDays = signal<IWeatherForecast[] | undefined>(undefined);
    public weatherForecastHours = signal<IWeatherForecast[] | undefined>(undefined);
    private _apiUrl = environment.apiUrl;

    constructor(
        private _httpService: HttpService,
        private _localStorageService: LocalStorageService,
    ) {
        const weatherCurrent = this._localStorageService.getItem<IWeatherCurrent>('weatherCurrent');
        const weatherForecastDays = this._localStorageService.getItem<IWeatherForecast[]>('weatherForecastDays');
        const weatherForecastHours = this._localStorageService.getItem<IWeatherForecast[]>('weatherForecastHours');

        if (weatherCurrent) {
            this.weatherCurrent.set(weatherCurrent);
        }
        if (weatherForecastDays) {
            this.weatherForecastDays.set(weatherForecastDays);
        }
        if (weatherForecastHours) {
            this.weatherForecastHours.set(weatherForecastHours);
        }
    }

    async fetchWeatherData(city: ICity) {
        await this.fetchWeatherCurrent(city);
        await this.fetchWeatherForecast(city, 'days');
        await this.fetchWeatherForecast(city, 'hours');
    }

    clearWeatherData() {
        this.weatherCurrent.set(undefined);
        this.weatherForecastDays.set(undefined);
        this.weatherForecastHours.set(undefined);
    }

    async fetchWeatherCurrent(city: ICity) {
        const response = await this._httpService.get<IWeatherCurrent>(`${this._apiUrl}/weather/current?lat=${city.lat}&lon=${city.lon}`);

        if (response.ok) {
            this.weatherCurrent.set(response.object);
            this._localStorageService.setItem('weatherCurrent', response.object);
        }
    }

    async fetchWeatherForecast(city: ICity, interval: IntervalType) {
        const response = await this._httpService.get<IWeatherForecast[]>(`${this._apiUrl}/weather/forecast?lat=${city.lat}&lon=${city.lon}&interval=${interval}`);

        if (response.ok) {
            if (interval === 'days') {
                this.weatherForecastDays.set(response.object);
                this._localStorageService.setItem('weatherForecastDays', response.object);
            } else {
                this.weatherForecastHours.set(response.object);
                this._localStorageService.setItem('weatherForecastHours', response.object);
            }
        }
    }

    async fetchCities(input: string) {
        const response = await this._httpService.get<ICity[]>(`${this._apiUrl}/cities?city=${input}`);
        return response.ok ? response.object : [];
    }
}
