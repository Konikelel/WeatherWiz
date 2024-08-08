import { Component, input } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-weather-now',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './weather-now.component.html',
  styleUrl: './weather-now.component.scss',
})
export class WeatherNowComponent {
  public city = input.required<string>();
  protected weatherCurrent = this.weatherService.weatherCurrent.asReadonly();
  protected readonly Math = Math;

  constructor(private weatherService: WeatherService) {}

  async ngOnInit() {
    await this.weatherService.fetchCurrentWeather(this.city());
  }

  get currentDate() {
    return Date.now();
  }
}
