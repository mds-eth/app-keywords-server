import BaseService from './BaseService';

import ModelGoogleIndexPages from '../models/GoogleIndexPages';

class GoogleIndexPagesService extends BaseService
{
  constructor()
  {
    super();
  }
  async getGoogleIndexPagesUUID(uuid)
  {
    try {
      
      const response = await ModelGoogleIndexPages.findAll({
        where: { uuid },
        attributes: ['url', 'quantity_pages'],
      });

      if (response.length > 0) {
        return response;
      }
      return false;
    } catch (error) { }
  }
}

export default new GoogleIndexPagesService();
