import ModelLogErrors from '../app/models/LogErrors';
import ModelNotFounds from '../app/models/NotFounds';
import ModelBlackList from '../app/models/BlackListIps';

class BlackList
{

  async saveRouteNotFound(url, headers)
  {
    try {

      if (headers['x-real-ip'] === undefined) return false;

      const fields = await this.returnArrayHeaders(headers);

      const { host, accept, x_real_ip, connection, user_agent, x_forwarded_for, x_forwarded_photo } = fields;

      await ModelNotFounds.create({ url, host, accept, x_real_ip, connection, user_agent, x_forwarded_for, x_forwarded_photo });

      return true;
    } catch (error) {
      await ModelLogErrors.create({ uuid: '', params: headers, error: error.stack });
      return false;
    }
  }

  async saveBlackListIps(headers)
  {
    try {

      const fields = await this.returnArrayHeaders(headers);

      const { host, accept, x_real_ip, connection, user_agent, x_forwarded_for, x_forwarded_photo } = fields;

      await ModelBlackList.create({ host, accept, x_real_ip, connection, user_agent, x_forwarded_for, x_forwarded_photo });
    } catch (error) {
      await ModelLogErrors.create({ uuid: '', params: headers, error: error.stack });
      return false;
    }
  }

  async queryQuantityNotFounds(headers)
  {

    try {

      if (headers['x-real-ip'] === undefined) return false;

      const x_real_ip = headers['x-real-ip'];

      const response = await ModelNotFounds.findAll({
        where: { x_real_ip }
      });

      if (response.length > 3) {
        await this.saveBlackListIps(headers);
        return false;
      }
      return true;
    } catch (error) {
      await ModelLogErrors.create({ uuid: '', params: headers, error: error.stack });
      return false;
    }
  }

  async queryBlackListIps(headers)
  {
    try {

      if (headers['x-real-ip'] === undefined) return false;

      const x_real_ip = headers['x-real-ip'];

      const response = await ModelBlackList.findAll({
        where: { x_real_ip }
      });

      if (response.length === 0) {
        return true;
      }
      return false;
    } catch (error) {
      await ModelLogErrors.create({ uuid: '', params: headers, error: error.stack });
      return false;
    }
  }

  async returnArrayHeaders(headers)
  {
    const host = headers.host;
    const accept = headers.accept;
    const x_real_ip = headers['x-real-ip'];
    const connection = (headers.connection === undefined) ? '' : headers.connection;
    const user_agent = (headers['user-agent'] === undefined) ? '' : headers['user-agent'];
    const x_forwarded_for = (headers['x-forwarded-for'] === undefined) ? '' : headers['x-forwarded-for'];
    const x_forwarded_photo = (headers['x-forwarded-photo'] === undefined) ? '' : headers['x-forwarded-photo'];

    return { host, accept, x_real_ip, connection, user_agent, x_forwarded_for, x_forwarded_photo }
  }
}

export default new BlackList();