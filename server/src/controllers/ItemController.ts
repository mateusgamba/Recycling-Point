import { Request, Response } from 'express';
import { Item } from "../models";

export default class ItemController {

  async all(request: Request, response: Response) {
     try {
      const items = await Item.findAll();
      const serializedItems = items.map(item => {
        return {
          ...item.toJSON(),
          image_url: `${process.env.APP_URL}/images/${item.image}`
        }
      })
      return response.status(200).json(serializedItems);
    } catch (error) {
      return response.status(500).send(error.message);
    }
  }
}
