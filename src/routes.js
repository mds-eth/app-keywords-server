import { Router } from 'express';

import middlewareJWT from './app/middlewares/middewareJWT';
import middlewareSecret from './app/middlewares/middlewareSecret';

import SessionController from './app/controllers/SessionController';
import SearchGoogleController from './app/controllers/SearchGoogleController';

class Routes {
  constructor() {
    this.routes = Router();

    this.createRoutes();
  }

  createRoutes() {
    this.routes.get('/api/v1/session/get-token', middlewareSecret, SessionController.createToken);

    this.routes.get('/api/v1/google/get-result-api', SearchGoogleController.getReturnApi);
    this.routes.post('/api/v1/google/search-keyword', middlewareJWT, SearchGoogleController.searchKeyword);
  }
}

export default new Routes().routes;
