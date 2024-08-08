import {Component, computed, input, OnInit} from '@angular/core';
import {WeatherService} from "../../services/weather.service";
import {DatePipe} from "@angular/common";
import { SkeletonComponent } from "../skeleton/skeleton.component";

@Component({
  selector: 'app-weekly-forecast',
  standalone: true,
  imports: [
    SkeletonComponent,
    DatePipe
  ],
  templateUrl: './weekly-forecast.component.html',
  styleUrl: './weekly-forecast.component.scss',
})
export class WeeklyForecastComponent implements OnInit {
  public city = input.required<string>();
  protected weatherForecastDays = this.weatherService.weatherForecastDays.asReadonly();
  protected isLoading = computed(() => this.weatherForecastDays() == undefined)

  constructor(private weatherService: WeatherService) {}

  async ngOnInit() {
    await this.weatherService.fetchForecastWeather(this.city(), "days");
  }

  protected readonly Array = Array;
}
