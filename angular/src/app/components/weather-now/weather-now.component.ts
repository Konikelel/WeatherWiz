import { Component, input } from '@angular/core';

@Component({
  selector: 'app-weather-now',
  standalone: true,
  imports: [],
  templateUrl: './weather-now.component.html',
  styleUrl: './weather-now.component.scss',
})
export class WeatherNowComponent {
  city = input.required<string>();
}
