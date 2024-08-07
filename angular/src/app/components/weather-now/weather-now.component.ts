import { Component, input } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather-now',
  standalone: true,
  imports: [],
  templateUrl: './weather-now.component.html',
  styleUrl: './weather-now.component.scss',
})
export class WeatherNowComponent {
  city = input.required<string>();

  weatherCurrent = this.weatherService.currentWeather;

  constructor(private weatherService: WeatherService) {}

  async ngOnInit() {
    await this.weatherService.fetchCurrentWeather('London');
  }
}
