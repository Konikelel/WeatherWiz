import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {WeeklyForecastComponent} from "./weekly-forecast/weekly-forecast.component";
import {HourlyForecastComponent} from "./hourly-forecast/hourly-forecast.component";
import {WeatherDataComponent} from "./weather-data/weather-data.component";
import {WeatherNowComponent} from "./weather-now/weather-now.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, WeeklyForecastComponent, HourlyForecastComponent, WeatherDataComponent, WeatherNowComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'weatherWiz';
}
