import { Request, Response } from 'express';
import { Country } from "../models";

export default class CountryController {

  async all(request: Request, response: Response) {
     try {
      const countries = await Country.findAll({
        order: [
            ['name', 'ASC']
        ]
      });
      return response.status(200).json(countries);
    } catch (error) {
      return response.status(500).send(error.message);
    }
  }
}
