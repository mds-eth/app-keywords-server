import ModelPerformanceUrls from '../models/PerformanceUrls';
import ModelLogErros from '../models/LogErrors';

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
    } catch (error) {
      await ModelLogErros.create({ uuid, params: '', error: error.stack });
      return false;
    }
  }
}

export default new PerformanceUrlService();
