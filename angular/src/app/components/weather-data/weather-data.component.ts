import { Component, input } from '@angular/core';
import {WeatherService} from "../../services/weather.service";
import {PercentPipe, DatePipe} from "@angular/common";


@Component({
  selector: 'app-weather-data',
  standalone: true,
  imports: [
    PercentPipe,
    DatePipe
  ],
  templateUrl: './weather-data.component.html',
  styleUrl: './weather-data.component.scss',
})
export class WeatherDataComponent {
  public city = input.required<string>();
  protected weatherData = this.weatherService.weatherCurrent.asReadonly();

  constructor(private weatherService: WeatherService) {}

  async ngOnInit() {
    await this.weatherService.fetchCurrentWeather(this.city());
  }
}
