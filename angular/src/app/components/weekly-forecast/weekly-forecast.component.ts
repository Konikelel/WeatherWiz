import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import {WeatherService} from "../../services/weather.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-weekly-forecast',
  standalone: true,
  imports: [
    NgOptimizedImage,
    DatePipe
  ],
  templateUrl: './weekly-forecast.component.html',
  styleUrl: './weekly-forecast.component.scss',
})
export class WeeklyForecastComponent {
  public city = input.required<string>();
  protected weatherForecastDays = this.weatherService.weatherForecastDays.asReadonly();

  constructor(private weatherService: WeatherService) {}

  async ngOnInit() {
    await this.weatherService.fetchForecastWeather(this.city(), "days");
  }
}
