import { Router } from 'express';

import middlewareJWT from './app/middlewares/middewareJWT';
import middlewareRedis from './app/middlewares/middlewareRedis';
import middlewareSecret from './app/middlewares/middlewareSecret';
import middlewareLogRequests from './app/middlewares/middlewareLogRequests';

import SessionController from './app/controllers/SessionController';
import DataForSeoController from './app/controllers/DataForSeoController';
import SearchResultController from './app/controllers/SearchResultController';

class Routes
{
  constructor()
  {
    this.routes = Router();

    this.createRoutes();
  }

  createRoutes()
  {
    this.routes.use(middlewareLogRequests);
    this.routes.get('/api/v1/test', (req, res) =>
    {
      return res.status(200).json({ status: true, message: 'Heyy dude.' });

    });

    this.routes.get('/api/v1/session/get-token', middlewareSecret, SessionController.createToken);

    this.routes.post('/api/v1/google/search-keyword', middlewareJWT, DataForSeoController.searchKeyword);
    this.routes.get('/api/v1/google/get-result-domains/:uuid', middlewareJWT, middlewareRedis, SearchResultController.getResultDomains);

    this.routes.get('*', (req, res) => { res.status(404).json({ status: false, message: 'Not Found.' }); });

    this.routes.post('*', (req, res) => { res.status(404).json({ status: false, message: 'Not Found.' }); });

    this.routes.put('*', (req, res) => { res.status(404).json({ status: false, message: 'Not Found.' }); });

    this.routes.delete('*', (req, res) => { res.status(404).json({ status: false, message: 'Not Found.' }); });
  }
}

export default new Routes().routes;
