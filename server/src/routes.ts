import express, { Request, Response } from 'express';
import ItemController from './controllers/ItemController';
import PointController from './controllers/PointController';
import CountryController from './controllers/CountryController';
import multer from 'multer';

import uploadConfig from './config/upload';

const routes = express.Router();

const upload = multer(uploadConfig);

const itemController = new ItemController();
const countryController = new CountryController();
const pointController = new PointController();

routes.get('/items', itemController.all);
routes.get('/countries', countryController.all);
routes.get('/points', pointController.all);
routes.get('/points/cities', pointController.cities);
routes.get('/points/:id', pointController.find);
routes.post('/points',  upload.single('image'), pointController.store);

routes.get('/', (request: Request, response: Response) => {
  return response.json({'message': 'It\'s working!!' });
});

export default routes;