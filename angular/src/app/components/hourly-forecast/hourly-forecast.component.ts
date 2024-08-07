import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hourly-forecast',
  standalone: true,
  imports: [],
  templateUrl: './hourly-forecast.component.html',
  styleUrl: './hourly-forecast.component.scss',
})
export class HourlyForecastComponent {
  city = input.required<string>();

  numbers = Array(8)
    .fill(0)
    .map((_, i) => i);
}
