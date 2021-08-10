import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import authConfig from '../../config/auth';

import ModelLogErros from '../models/LogErrors';

class SessionService
{
    constructor()
    {
        this.message = '';
        this.status = true;
    }

    async generateToken()
    {
        try {

            const uuid = uuidv4();

            const params = { uuid };
            return jwt.sign({ hash: uuid, params }, authConfig.secret, { expiresIn: authConfig.expiresIn });
        } catch (error) {
            await ModelLogErros.create({ uuid, params: '', error: error.stack });
            return false;
        }
    }

    async generateTokenFrontEnd(params)
    {
        try {

            const uuid = uuidv4();
            return jwt.sign({ hash: uuid, params }, authConfig.secret, { expiresIn: authConfig.expiresIn });
        } catch (error) {
            await ModelLogErros.create({ uuid, params: '', error: error.stack });
            return false;
        }
    }
}

export default new SessionService();