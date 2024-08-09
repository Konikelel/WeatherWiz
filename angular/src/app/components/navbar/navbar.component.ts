import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  public city = input.required<string>();
  public cityChange = output<string>();

  constructor(private weatherService: WeatherService) {}

  public async changeCityWeather(city: string) {
    this.cityChange.emit(city);
    await this.weatherService.clearWeatherData();
    await this.weatherService.fetchWeatherData(this.city());
  }
}
