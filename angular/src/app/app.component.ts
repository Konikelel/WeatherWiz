import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from './components/navbar/navbar.component';
import {WeeklyForecastComponent} from './components/weekly-forecast/weekly-forecast.component';
import {HourlyForecastComponent} from './components/hourly-forecast/hourly-forecast.component';
import {WeatherDataComponent} from './components/weather-data/weather-data.component';
import {WeatherNowComponent} from './components/weather-now/weather-now.component';
import {WeatherService} from './services/weather.service';
import ICity from "./models/city.model";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        NavbarComponent,
        WeeklyForecastComponent,
        HourlyForecastComponent,
        WeatherDataComponent,
        WeatherNowComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'weatherWiz';
    public city = signal<ICity>({name: 'New York', country: 'US', state: 'NY'});

    constructor(protected weatherService: WeatherService) {
    }

    async ngOnInit() {
        await this.weatherService.fetchWeatherData(this.city().name);
    }

    protected async onCitySubmit(city: ICity) {
        await this.weatherService.fetchWeatherData(city.name);
        this.city.set(city);
    }
}
