import { Component, input } from '@angular/core';
import {WeatherService} from "../../services/weather.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-hourly-forecast',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './hourly-forecast.component.html',
  styleUrl: './hourly-forecast.component.scss',
})
export class HourlyForecastComponent {
  public city = input.required<string>();
  protected weatherForecastHours = this.weatherService.weatherForecastHours.asReadonly();

  constructor(private weatherService: WeatherService) {}

  async ngOnInit() {
    await this.weatherService.fetchForecastWeather(this.city(), "hours");
  }
}
