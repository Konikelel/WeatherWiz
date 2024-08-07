import { Component, input } from '@angular/core';

@Component({
  selector: 'app-weather-data',
  standalone: true,
  imports: [],
  templateUrl: './weather-data.component.html',
  styleUrl: './weather-data.component.scss',
})
export class WeatherDataComponent {
  city = input.required<string>();
}
