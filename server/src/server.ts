import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import routes from './routes';
import cors from 'cors';
import path from 'path';

import errorHandler from './errors/handler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/images', express.static(path.resolve(__dirname, '..', 'assets', 'img')));
app.use(errorHandler);

app.listen(process.env.PORT || 5000)