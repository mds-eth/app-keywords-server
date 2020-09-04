import ModelApiForSeo from '../models/ApiForSeo';

import Redis from '../../lib/Redis';

import ApiMozService from '../service/ApiMozService';
import PerformanceUrlService from './PerformanceUrlService';
import GoogleIndexPagesService from './GoogleIndexPagesService';

class SearchResultDomainService {
  async getResultUUID(uuid) {
    try {
      const response = await ModelApiForSeo.findAll({
        where: { uuid },
        attributes: ['type', 'rank_group', 'rank_absolute', 'position', 'domain'],
      });

      if (response.length > 0) {
        const googlePages = await GoogleIndexPagesService.getGoogleIndexPagesUUID(uuid);
        const responseMoz = await ApiMozService.getResultMozUUID(uuid);
        const performanceURLS = await PerformanceUrlService.getPerformanceURLSUUID(uuid);

        const values = {
          apiDataForSeo: response,
          googlePages,
          responseMoz,
          performanceURLS,
        };

        await Redis.addCacheRedis(uuid, JSON.stringify(values));

        return values;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default new SearchResultDomainService();
