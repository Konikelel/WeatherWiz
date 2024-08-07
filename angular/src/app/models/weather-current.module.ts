import IWeatherDesc from './weather-desc.module';
import ILocation from './location.module';
import IWeatherData from './weather-data.module';
import IWind from './wind.module';

export default interface IWeatherCurrent {
  desc: IWeatherDesc;
  location: ILocation;

  data: IWeatherData;
  wind: IWind;
}
