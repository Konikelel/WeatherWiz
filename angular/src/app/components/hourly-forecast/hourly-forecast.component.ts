import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { StyleEnum } from '../../enums/style.enum';
import IWeatherForecast from '../../models/weather-forecast.module';

@Component({
  selector: 'app-hourly-forecast',
  standalone: true,
  imports: [DatePipe, SkeletonComponent],
  templateUrl: './hourly-forecast.component.html',
  styleUrl: './hourly-forecast.component.scss',
})
export class HourlyForecastComponent {
  public weatherForecast = input.required<IWeatherForecast[] | undefined>();

  protected readonly StyleEnum = StyleEnum;
  protected readonly Array = Array;
}
