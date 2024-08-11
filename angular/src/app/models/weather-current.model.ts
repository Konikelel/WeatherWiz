import IWeatherDesc from './weather-desc.model';
import ILocation from './location.model';
import IWeatherData from './weather-data.model';
import IWind from './wind.model';

export default interface IWeatherCurrent {
  desc: IWeatherDesc;
  location: ILocation;

  data: IWeatherData;
  wind: IWind;
}
