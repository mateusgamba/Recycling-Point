import { City } from './City';

export interface Country {
  id?: number;
  name: string;
  cities: Array<City>;
}
