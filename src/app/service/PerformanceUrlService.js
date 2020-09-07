import ModelPerformanceUrls from '../models/PerformanceUrls';

class PerformanceUrlService 
{
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
