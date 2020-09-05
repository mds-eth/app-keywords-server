import BaseService from './BaseService';

import ModelMozResults from '../models/MozResults';

class ApiMozService extends BaseService
{
  constructor()
  {
    super();
  }

  async getResultMozUUID(uuid)
  {

    try {

      const response = await ModelMozResults.findAll({
        where: { uuid },
        attributes: ['url', 'upa', 'pda'],
      });

      if (response.length > 0) {
        return response;
      }
      return false;
    } catch (error) { }
  }
}

export default new ApiMozService();
