import express from 'express';
import cors from 'cors';

import './database';

import './lib/Redis';

import routes from './routes';

class App
{
  constructor()
  {
    this.server = express();

    this.middlewares();
    this.createCors();
    this.createRoutes();
  }

  middlewares()
  {
    this.server.use(express.json());
  }

  createCors()
  {
    this.server.use(cors());
  }

  createRoutes()
  {
    this.server.use(routes);

  }
}

export default new App().server;
