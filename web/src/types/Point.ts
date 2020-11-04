import { ItemPoint } from './ItemPoint';

export interface Point {
  id?: number;
  name: string;
  email: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  street: string;
  number: number | string;
  whatsapp: string;
  image_url?: string;
  latitude?: number;
  longitude?: number;
  Items?: Array<ItemPoint>;
}
