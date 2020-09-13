import { Router } from 'express';

import BlackList from './helpers/Blacklist';

import middlewareJWT from './app/middlewares/middewareJWT';
import middlewareRedis from './app/middlewares/middlewareRedis';
import middlewareSecret from './app/middlewares/middlewareSecret';
import middlewareBlackList from './app/middlewares/middlewareBlackList';
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
    this.routes.use(middlewareBlackList);
    this.routes.use(middlewareLogRequests);

    this.routes.get('/api/v1/session/get-token', middlewareSecret, SessionController.createToken);

    this.routes.post('/api/v1/google/search-keyword', middlewareJWT, DataForSeoController.searchKeyword);
    this.routes.get('/api/v1/google/get-result-domains/:uuid', middlewareJWT, middlewareRedis, SearchResultController.getResultDomains);

    this.routes.get('*', async (req, res) =>
    {
      return await this.saveRouteNotFound(res, req.url, req.headers);
    });

    this.routes.post('*', async (req, res) =>
    {
      return await this.saveRouteNotFound(res, req.url, req.headers);
    });

    this.routes.put('*', async (req, res) =>
    {
      return await this.saveRouteNotFound(res, req.url, req.headers);
    });

    this.routes.delete('*', async (req, res) =>
    {
      return await this.saveRouteNotFound(res, req.url, req.headers);
    });
  }

  async saveRouteNotFound(res, url, headers)
  {
    const data = await BlackList.saveRouteNotFound(url, headers);

    if (!data) {
      return res.status(401).json({ status: false, message: 'Full authentication is required to access this resource.' });
    }
    return res.status(404).json({ status: false, message: 'Not Found.' });
  }
}

export default new Routes().routes;
