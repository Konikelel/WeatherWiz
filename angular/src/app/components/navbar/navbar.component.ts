import {Component, ElementRef, input, output, signal, viewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {WeatherService} from '../../services/weather.service';
import ICity from "../../models/city.model";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  public city = input.required<ICity | undefined>();
  public citySubmit = output<ICity>();
  protected cityInput = viewChild.required<ElementRef<HTMLInputElement>>('cityInput');
  protected autocompleteCities = signal<ICity[] | undefined>(undefined);

  constructor(private weatherService: WeatherService) {
  }

  protected areAutocompleteCities() {
    const autocompleteCities = this.autocompleteCities();
    if (autocompleteCities) {
      return autocompleteCities.length > 0;
    }
    return false;
  }

  protected async onCityInputChange(cityName: string) {
    const cities = await this.weatherService.fetchCities(cityName);
    this.autocompleteCities.set(cities);
  }

  protected onExitSearch() {
    this.cityInput().nativeElement.value = '';
    this.autocompleteCities.set(undefined);
  }

  protected async onSubmit() {
    if (this.areAutocompleteCities()) {
      return this.onSubmitCity(this.autocompleteCities()![0]);
    }
  }

  protected async onSubmitCity(city: ICity) {
    if (city != this.city()) {
      this.cityInput().nativeElement.value = city.name;
      this.autocompleteCities.set(undefined);
      this.weatherService.clearWeatherData();
      this.citySubmit.emit(city);
    }
  }

  protected getCurrentLocationWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          this.autocompleteCities.set(undefined);
          this.weatherService.clearWeatherData();
          this.cityInput().nativeElement.value = '';
          
          await this.weatherService.fetchWeatherData(<ICity>{
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            name: 'Current Location',
            id: 'XXX',
            country: 'XXX'
          })
        }
      )
    }
  }
}
