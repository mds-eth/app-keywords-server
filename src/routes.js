import { Router } from 'express';

import middlewareJWT from './app/middlewares/middewareJWT';
import middlewareSecret from './app/middlewares/middlewareSecret';

import SessionController from './app/controllers/SessionController';
import DataForSeoController from './app/controllers/DataForSeoController';

class Routes {
  constructor() {
    this.routes = Router();

    this.createRoutes();
  }

  createRoutes() {
    this.routes.get('/api/v1/session/get-token', middlewareSecret, SessionController.createToken);

    this.routes.get('/api/v1/google/get-result-api', middlewareJWT, DataForSeoController.getReturnApi);
    this.routes.post('/api/v1/google/search-keyword', middlewareJWT, DataForSeoController.searchKeyword);
  }
}

export default new Routes().routes;
