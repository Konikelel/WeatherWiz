import { Component, computed, input } from '@angular/core';
import { DatePipe, PercentPipe } from '@angular/common';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { StyleEnum } from '../../enums/style.enum';
import IWeatherCurrent from '../../models/weather-current.module';

@Component({
  selector: 'app-weather-data',
  standalone: true,
  imports: [SkeletonComponent, PercentPipe, DatePipe],
  templateUrl: './weather-data.component.html',
  styleUrl: './weather-data.component.scss',
})
export class WeatherDataComponent {
  public weatherCurrent = input.required<IWeatherCurrent | undefined>();
  protected isLoading = computed(() => this.weatherCurrent() == undefined);

  protected readonly StyleEnum = StyleEnum;
}
