import ILocation from "./location.model";
import IWeatherForecastItem from "./weather-forecast-item.model";

export default interface IWeatherForecast {
    location: ILocation;
    data: IWeatherForecastItem[];
}
