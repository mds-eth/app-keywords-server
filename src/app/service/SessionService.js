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
      return jwt.sign({ hash: uuid }, authConfig.secret, { expiresIn: authConfig.expiresIn });
    } catch (error) {
      await ModelLogErros.create({ uuid, params: '', error: error.stack });
      return false;
      return await this.returnMessageError('Error create token.');
    }
  }

  async returnMessageError(message)
  {
    this.status = false;
    this.message = message;
    return false;
  }
}

export default new SessionService();