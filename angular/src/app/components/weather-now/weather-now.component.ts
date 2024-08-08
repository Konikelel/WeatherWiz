import {Component, computed, input} from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { DatePipe } from "@angular/common";
import { SkeletonComponent } from "../skeleton/skeleton.component";
import {StyleEnum} from "../../enums/style.enum";

@Component({
  selector: 'app-weather-now',
  standalone: true,
  imports: [
    SkeletonComponent,
    DatePipe
  ],
  templateUrl: './weather-now.component.html',
  styleUrl: './weather-now.component.scss',
})
export class WeatherNowComponent {
  public city = input.required<string>();
  protected weatherCurrent = this.weatherService.weatherCurrent.asReadonly();
  protected isLoading = computed(() => this.weatherCurrent() == undefined)
  protected currentDate = Date.now();
  protected readonly Math = Math;

  constructor(private weatherService: WeatherService) {}

  protected readonly StyleEnum = StyleEnum;
}
