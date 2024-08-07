import IWeatherDesc from './weather-desc.module';
import IWeatherData from './weather-data.module';
import IWind from './wind.module';

export default interface IWeatherForecast {
  time: number;
  desc: IWeatherDesc;

  data: IWeatherData;
  wind: IWind;
}
