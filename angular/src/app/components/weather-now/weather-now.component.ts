import { Component, computed, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { StyleEnum } from '../../enums/style.enum';
import IWeatherCurrent from '../../models/weather-current.module';

@Component({
  selector: 'app-weather-now',
  standalone: true,
  imports: [SkeletonComponent, DatePipe],
  templateUrl: './weather-now.component.html',
  styleUrl: './weather-now.component.scss',
})
export class WeatherNowComponent {
  public weatherCurrent = input.required<IWeatherCurrent | undefined>();
  protected isLoading = computed(() => this.weatherCurrent() == undefined);

  protected readonly currentDate = Date.now();
  protected readonly StyleEnum = StyleEnum;
}
