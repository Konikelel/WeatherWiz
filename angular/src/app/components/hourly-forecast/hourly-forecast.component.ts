import { Component } from '@angular/core';

@Component({
  selector: 'app-hourly-forecast',
  standalone: true,
  imports: [],
  templateUrl: './hourly-forecast.component.html',
  styleUrl: './hourly-forecast.component.scss',
})
export class HourlyForecastComponent {
  numbers = Array(8)
    .fill(0)
    .map((_, i) => i);
}
