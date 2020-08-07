import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

class SessionService {

  constructor() {
    this.message = '';
    this.status = true;
  }

  async generateToken(hash) {

    try {
      return jwt.sign({ hash }, authConfig.secret, { expiresIn: authConfig.expiresIn });
    } catch (error) {
      return await this.returnMessageError('Error create token.');
    }
  }

  async returnMessageError(message) {
    this.status = false;
    this.message = message;
    return false;
  }
}

export default new SessionService();