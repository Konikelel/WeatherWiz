import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import IWeatherForecast from '../../models/weather-forecast.module';
import { StyleEnum } from '../../enums/style.enum';

@Component({
  selector: 'app-weekly-forecast',
  standalone: true,
  imports: [SkeletonComponent, DatePipe],
  templateUrl: './weekly-forecast.component.html',
  styleUrl: './weekly-forecast.component.scss',
})
export class WeeklyForecastComponent {
  public weatherForecast = input.required<IWeatherForecast[] | undefined>();

  protected readonly StyleEnum = StyleEnum;
  protected readonly Array = Array;
}
