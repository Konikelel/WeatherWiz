import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-weekly-forecast',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './weekly-forecast.component.html',
  styleUrl: './weekly-forecast.component.scss',
})
export class WeeklyForecastComponent {
  numbers = Array(5)
    .fill(0)
    .map((_, i) => i);
}
