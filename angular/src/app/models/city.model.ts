export default interface ICity {
  id: string;
  lat: number;
  lon: number;

  name: string;
  country: string;
  state?: string;
}
