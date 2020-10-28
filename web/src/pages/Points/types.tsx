export interface Point {
  id: number,
  name: string,
  city: string,
  province: string,
  country: string,
  zip: string,
  street: string,
  number: number,
  whatsapp: string,
  image_url: string,
  latitude: number,
  longitude: number,
  Items: Array<Item>
}

export interface Item {
  id: number,
  name: string
}