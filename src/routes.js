import { Router } from 'express';

import BlackList from './helpers/Blacklist';

import multer from 'multer';

import uploadConfig from './config/multerConfig'

import middlewareJWT from './app/middlewares/middlewareJWT';
import middlewareRedis from './app/middlewares/middlewareRedis';
import middlewareSecret from './app/middlewares/middlewareSecret';
import middlewareBlackList from './app/middlewares/middlewareBlackList';
import middlewareLogRequests from './app/middlewares/middlewareLogRequests';

import UserController from './app/controllers/UserController';
import LoginController from './app/controllers/LoginController';

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

        this.routes.post('/api/v1/login', LoginController.login);
        this.routes.post('/api/v1/new-account', LoginController.createNewAccount);
        this.routes.post('/api/v1/login-linkedin', LoginController.loginLinkedin);

        this.routes.post('/api/v1/recover-password', LoginController.recoverPassword);

        this.routes.get('/api/v1/user', middlewareJWT, UserController.getDetailUser);

        const upload = multer(uploadConfig);

        this.routes.put('/api/v1/user', middlewareJWT, upload.single('file'), UserController.updateUser);

        this.routes.post('/api/v1/google/search-keyword', middlewareJWT, DataForSeoController.searchKeyword);
        this.routes.get('/api/v1/google/get-last-searchs-user', middlewareJWT, SearchResultController.getLastSerchsUser);
        this.routes.get('/api/v1/google/get-detail-register/:uuid', middlewareJWT, middlewareRedis, SearchResultController.getDetailRegister);
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
