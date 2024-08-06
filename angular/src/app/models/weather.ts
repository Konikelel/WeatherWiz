import IWeatherDesc from './weather-desc';
import IWeatherData from "./weather-data";
import IWind from "./wind";
import ILocation from "./location";

interface IWeatherForecast {
  time: number;
  desc: IWeatherDesc;

  data: IWeatherData;
  wind: IWind;
}

interface IWeatherCurrent {
  desc: IWeatherDesc;
  location: ILocation;

  data: IWeatherData;
  wind: IWind;
}

export { IWeatherForecast, IWeatherCurrent };
