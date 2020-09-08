import axios from 'axios';

import ModelLogErrors from '../models/LogErrors';
import ModelLogRequestsApi from '../models/LogRequestsApis';

class BaseService
{
  async callAPI(method, params = null, urlRequest, headers = null, uuid)
  {
    try {

      const input = new Date();
      if (method === 'POST') {
        var response = await axios.post(urlRequest, params, { timeout: 60 * 4 * 1000, headers: headers });
      } else if (method === 'GET') {
        var response = await axios.get(urlRequest, { timeout: 60 * 4 * 1000 });
      }
      const exit = new Date();

      await ModelLogRequestsApi.create({
        method,
        params,
        api: urlRequest,
        headers,
        response: response.data,
        input,
        exit,
      });

      return response;
    } catch (error) {
      await ModelLogErrors.create({ uuid, params, error: error.stack });
      return false;
    }
  }
}

export default new BaseService();