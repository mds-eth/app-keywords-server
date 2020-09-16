import crypto from 'crypto';

class Helpers
{
  async returnBinaryFunctionHmac(string)
  {
    return crypto.createHmac('sha1', process.env.API_MOZ_SECRET_KEY).update(string).digest('base64')
  }
}

export default new Helpers();
