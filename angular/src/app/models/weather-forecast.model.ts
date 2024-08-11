import IWeatherDesc from './weather-desc.model';
import IWeatherData from './weather-data.model';
import IWind from './wind.model';

export default interface IWeatherForecast {
  time: number;
  desc: IWeatherDesc;

  data: IWeatherData;
  wind: IWind;
}