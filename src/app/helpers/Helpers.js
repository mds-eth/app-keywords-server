import crypto from 'crypto';

class Helpers {
  async returnBinaryFunctionHmac(string) {
    var hmac = crypto.createHmac('sha1', process.env.API_MOZ_SECRET_KEY);
    hmac.update(string);
    return hmac.digest('binary');
  }
}

export default new Helpers();
