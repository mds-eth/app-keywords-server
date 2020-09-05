import BaseService from './BaseService';

import ModelPerformanceUrls from '../models/PerformanceUrls';

class PerformanceUrlService extends BaseService
{
  constructor(){
    super();
  }

  async getPerformanceURLSUUID(uuid)
  {
    try {

      const response = await ModelPerformanceUrls.findAll({
        where: { uuid },
        attributes: ['strategy', 'url', 'score'],
      });

      if (response.length > 0) {
        return response;
      }
      return false;
    } catch (error) { }
  }
}

export default new PerformanceUrlService();
