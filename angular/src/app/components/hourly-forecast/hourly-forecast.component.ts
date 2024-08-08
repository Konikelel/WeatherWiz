import {Component, computed, input, OnInit} from '@angular/core';
import {WeatherService} from "../../services/weather.service";
import {DatePipe} from "@angular/common";
import { SkeletonComponent } from "../skeleton/skeleton.component";

@Component({
  selector: 'app-hourly-forecast',
  standalone: true,
  imports: [
    DatePipe,
    SkeletonComponent
  ],
  templateUrl: './hourly-forecast.component.html',
  styleUrl: './hourly-forecast.component.scss',
})
export class HourlyForecastComponent implements OnInit {
  public city = input.required<string>();
  protected weatherForecastHours = this.weatherService.weatherForecastHours.asReadonly();
  protected isLoading = computed(() => this.weatherForecastHours() == undefined)

  constructor(private weatherService: WeatherService) {}

  async ngOnInit() {
    await this.weatherService.fetchForecastWeather(this.city(), "hours");
  }

  protected readonly Array = Array;
}
