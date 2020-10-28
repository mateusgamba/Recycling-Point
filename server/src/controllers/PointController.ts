import { Request, Response } from 'express';
import { Point, Item } from "../models";
import * as Yup from 'yup';
import geo from '../config/geo';

export default class PointController {

  async all(request: Request, response: Response) {
    const queryFilter = request.query;

    try {
      const points = await Point.findAll({
        order: [
            ['id', 'DESC']
        ],
        where: queryFilter,
        include: Item
      });

      const serializedPoints = points.map(point => {
        const image_url  = point.image
          ? `${process.env.STORAGE_URL}/${point.image}`
          : `${process.env.APP_URL}/images/no-image.png`
        return {
          ...point.toJSON(),
          image_url,
          items: point.items
        }
      })
      return response.status(200).json(serializedPoints);
    } catch (error) {
      return response.status(500).send(error.message);
    }
  }

  async store(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      zip,
      street,
      number,
      city,
      province,
      country,
      items,
    } = request.body;

    let image = '';
    if (request.file) {
      const requestImage: any = request.file as Express.Multer.File;
      image = requestImage.key.substr(requestImage.key.lastIndexOf('/')+1);
    }

    const pointData = {
      name,
      email,
      whatsapp,
      image,
      zip,
      street,
      number: number ? parseInt(number, 10) : null,
      city,
      province,
      country
    };

    const itemsArray = items ? items.split(',') : [];

    const schema = Yup.object().shape({
      name: Yup.string().required().label('Personal Name or Company name'),
      email: Yup.string().required().label('E-mail'),
      whatsapp: Yup.string().required().label('Whatsapp'),
      street: Yup.string().required().label('Street name'),
      number: Yup.number().nullable().label('Number'),
      city: Yup.string().required().label('City'),
      country: Yup.string().required().label('Country'),
      items: Yup.array().min(1)
    });

    await schema.validate(
      {
        items: itemsArray,
        ...pointData
      },
      { abortEarly: false }
    );

    const location: any = await geo({
      address: `${number} ${street}`,
      country,
      city
    });

    const latitude: number = location ? parseFloat(location[0].latitude.toString()) : 0;
    const longitude: number = location ? parseFloat(location[0].longitude.toString()) : 0;

    try {
      const point = await Point.create({
        latitude,
        longitude,
        ...pointData
      });

      await point.addItems(itemsArray);

      return response.status(200).json({
        message: "Thank you for subscribing!"
      });

    } catch (error) {
      return response.status(500).send(error.message);
    }
  }

  async find(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const point = await Point.findByPk(id, { include: Item });
      let serializedPoint = {};
      if (point) {
        serializedPoint = {
          ...point.toJSON(),
          image_url: `${process.env.STORAGE_URL}/${point.image}`,
          items: point.items
        };
      }

      return response.status(200).json(serializedPoint);
    } catch (error) {
      return response.status(500).send(error.message);
    }
  }

  async cities(request: Request, response: Response) {
    try {
      const points = await Point.findAll({
        attributes: ['city', 'country'],
        group: ['city', 'country'],
        order: [
          ['country', 'ASC'],
          ['city', 'ASC']
        ],
      });

      const serializedCities = points.reduce(function (accumulator: any, currentValue: any) {
        accumulator[currentValue.country] = accumulator[currentValue.country] || [];
        accumulator[currentValue.country].push(currentValue);
        return accumulator;
      }, Object.create(null));

      return response.status(200).json(serializedCities);
    } catch (error) {
      return response.status(500).send(error.message);
    }
  }
}