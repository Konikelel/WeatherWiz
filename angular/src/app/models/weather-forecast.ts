import IWeatherDesc from './weather-desc';
import IWeatherData from './weather-data';
import IWind from './wind';

export default interface IWeatherForecast {
  time: number;
  desc: IWeatherDesc;

  data: IWeatherData;
  wind: IWind;
}
