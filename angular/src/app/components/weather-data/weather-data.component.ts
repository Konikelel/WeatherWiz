import {Component, computed, input} from '@angular/core';
import {WeatherService} from "../../services/weather.service";
import {PercentPipe, DatePipe} from "@angular/common";
import { SkeletonComponent } from "../skeleton/skeleton.component";


@Component({
  selector: 'app-weather-data',
  standalone: true,
  imports: [
    SkeletonComponent,
    PercentPipe,
    DatePipe
  ],
  templateUrl: './weather-data.component.html',
  styleUrl: './weather-data.component.scss',
})
export class WeatherDataComponent {
  public city = input.required<string>();
  protected weatherData = this.weatherService.weatherCurrent.asReadonly();
  protected isLoading = computed(() => this.weatherData() == undefined)

  constructor(private weatherService: WeatherService) {}
}
