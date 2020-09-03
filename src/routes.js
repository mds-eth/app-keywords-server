import { Router } from 'express';

import middlewareJWT from './app/middlewares/middewareJWT';
import middlewareSecret from './app/middlewares/middlewareSecret';

import SessionController from './app/controllers/SessionController';
import DataForSeoController from './app/controllers/DataForSeoController';
import SearchResultController from './app/controllers/SearchResultController';

class Routes {
  constructor() {
    this.routes = Router();

    this.createRoutes();
  }

  createRoutes() {
    this.routes.get('/api/v1/session/get-token', middlewareSecret, SessionController.createToken);

    this.routes.post('/api/v1/google/search-keyword', middlewareJWT, DataForSeoController.searchKeyword);
    this.routes.get('/api/v1/google/get-result-domains/:uuid', middlewareJWT, SearchResultController.getResultDomains);
  }
}

export default new Routes().routes;
