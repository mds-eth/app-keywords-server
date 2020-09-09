import ModelApiForSeo from '../models/ApiForSeo';

import Redis from '../../lib/Redis';

import JobService from '../service/JobService';
import ModelLogErrors from '../models/LogErrors';
import ApiMozService from '../service/ApiMozService';
import PerformanceUrlService from './PerformanceUrlService';
import AlexaRankResultService from './AlexaRankResultService';
import GoogleIndexPagesService from './GoogleIndexPagesService';

class SearchResultDomainService
{
  async getResultUUID(uuid)
  {
    try {

      const response = await ModelApiForSeo.findAll({
        where: { uuid },
        attributes: ['type', 'rank_group', 'rank_absolute', 'position', 'domain'],
      });

      if (response.length > 0) {
        const googlePages = await GoogleIndexPagesService.getGoogleIndexPagesUUID(uuid);
        const responseMoz = await ApiMozService.getResultMozUUID(uuid);
        const performanceURLS = await PerformanceUrlService.getPerformanceURLSUUID(uuid);
        const keywords = await JobService.getKeywordsUUID(uuid);
        const alexaResult = await AlexaRankResultService.getResultAlexaRankgUUID(uuid);

        const values = {
          keywords,
          apiDataForSeo: response,
          googlePages,
          responseMoz,
          performanceURLS,
          alexaResult
        };

        await Redis.addCacheRedis(uuid, JSON.stringify(values));

        return values;
      }
      return false;
    } catch (error) {
      await ModelLogErrors.create({ uuid, params: '', error: error.stack });
      return false;
    }
  }
}

export default new SearchResultDomainService();
