import express from 'express';
import cors from 'cors';

import './database';

import BullBoard from 'bull-board';

//import './lib/Redis';
import Queue from './lib/Queue';

BullBoard.setQueues(Queue.queues.map((queue) => queue.bull));

import routes from './routes';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.createCors();
    this.createRoutes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  createCors() {
    this.server.use(cors());
  }

  createRoutes() {
    this.server.use(routes);
    this.server.use('/admin/queues', BullBoard.UI);
  }
}

export default new App().server;
