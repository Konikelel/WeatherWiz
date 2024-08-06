import IWeatherDesc from './weather-desc';
import ILocation from './location';
import IWeatherData from './weather-data';
import IWind from './wind';

export default interface IWeatherCurrent {
  desc: IWeatherDesc;
  location: ILocation;

  data: IWeatherData;
  wind: IWind;
}
