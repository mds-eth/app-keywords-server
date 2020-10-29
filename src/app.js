import express from 'express';
import cors from 'cors';

import path from 'path';

import './database';

import './lib/Redis';

import WebSocketLib from './lib/WebSocket';

import routes from './routes';

class App
{
  constructor()
  {
    this.server = express();

    this.middlewares();
    this.createCors();
    this.createWebSocket();
    this.createRoutes();
  }

  async createWebSocket()
  {
    await WebSocketLib.connect(this.server);
  }

  middlewares()
  {
    this.server.use(express.json());
    this.server.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
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
