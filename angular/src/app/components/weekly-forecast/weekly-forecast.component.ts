import {Component, input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {SkeletonComponent} from '../skeleton/skeleton.component';
import IWeatherForecast from '../../models/weather-forecast.model';
import {StyleEnum} from '../../enums/style.enum';
import {timeInterval} from "rxjs";

@Component({
  selector: 'app-weekly-forecast',
  standalone: true,
  imports: [SkeletonComponent, DatePipe],
  templateUrl: './weekly-forecast.component.html',
  styleUrl: './weekly-forecast.component.scss',
})
export class WeeklyForecastComponent {
  public weatherForecast = input.required<IWeatherForecast | undefined>();

  protected readonly StyleEnum = StyleEnum;
  protected readonly numberArray = [...new Array(5).keys()];
  protected readonly timeInterval = timeInterval;
}
