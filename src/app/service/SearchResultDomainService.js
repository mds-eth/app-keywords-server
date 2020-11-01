import ModelApiForSeo from '../models/ApiForSeo';

import Redis from '../../lib/Redis';

import JobService from '../service/JobService';
import ModelLogErrors from '../models/LogErrors';
import ModelFinishJobs from '../models/FinishedJobs';
import ApiMozService from '../service/ApiMozService';
import PerformanceUrlService from './PerformanceUrlService';
import AlexaRankResultService from './AlexaRankResultService';
import GoogleIndexPagesService from './GoogleIndexPagesService';

class SearchResultDomainService
{
  async getResultUUID(uuid)
  {
    try {

      const qtdFinishJobs = await ModelFinishJobs.findAll({ where: { uuid } });

      if (!qtdFinishJobs) return false;

      const keywords = await JobService.getKeywordsUUID(uuid);

      switch (qtdFinishJobs.length) {
        case 1:
          const apiDataForSeo = await ModelApiForSeo.findAll({
            where: { uuid },
            attributes: ['type', 'rank_group', 'rank_absolute', 'position', 'domain'],
          });

          await Redis.addCacheRedis(`apiDataSeo-${uuid}`, JSON.stringify(apiDataForSeo));

          return {
            keywords,
            apiDataForSeo,
            googlePages: false,
            responseMoz: false,
            performanceURLS: false,
            alexaResult: false
          };
        case 2:
          const dataSeo = await ModelApiForSeo.findAll({
            where: { uuid },
            attributes: ['type', 'rank_group', 'rank_absolute', 'position', 'domain'],
          });

          await Redis.addCacheRedis(`apiDataSeo-${uuid}`, JSON.stringify(dataSeo));

          const responseMoz = await ApiMozService.getResultMozUUID(uuid);

          await Redis.addCacheRedis(`responseMoz-${uuid}`, JSON.stringify(responseMoz));

          return {
            keywords,
            apiDataForSeo: dataSeo,
            googlePages: false,
            responseMoz,
            performanceURLS: false,
            alexaResult: false
          };
        case 3:

          const cacheAlexa = await Redis.getCacheById(`alexaResult-${uuid}`);

          if (!cacheAlexa) {
            var alexaResult = await AlexaRankResultService.getResultAlexaRankgUUID(uuid);

            await Redis.addCacheRedis(`alexaResult-${uuid}`, JSON.stringify(alexaResult));
          }

          return {
            keywords,
            apiDataForSeo: await Redis.getCacheById(`apiDataSeo-${uuid}`),
            googlePages: await Redis.getCacheById(`indexPages-${uuid}`),
            responseMoz: await Redis.getCacheById(`responseMoz-${uuid}`),
            performanceURLS: false,
            alexaResult: cacheAlexa ? cacheAlexa : alexaResult
          };
        case 4:

          const cache = await Redis.getCacheById(`indexPages-${uuid}`);

          if (!cache) {
            var resultPages = await GoogleIndexPagesService.getGoogleIndexPagesUUID(uuid);
            await Redis.addCacheRedis(`indexPages-${uuid}`, JSON.stringify(resultPages));
          }

          return {
            keywords,
            apiDataForSeo: await Redis.getCacheById(`apiDataSeo-${uuid}`),
            googlePages: cache ? cache : resultPages,
            responseMoz: await Redis.getCacheById(`responseMoz-${uuid}`),
            performanceURLS: false,
            alexaResult: await Redis.getCacheById(`alexaResult-${uuid}`)
          };
        case 5:
          const data = {
            keywords,
            apiDataForSeo: await Redis.getCacheById(`apiDataSeo-${uuid}`),
            googlePages: await Redis.getCacheById(`indexPages-${uuid}`),
            responseMoz: await Redis.getCacheById(`responseMoz-${uuid}`),
            performanceURLS: await PerformanceUrlService.getPerformanceURLSUUID(uuid),
            alexaResult: await Redis.getCacheById(`alexaResult-${uuid}`)
          };
          await Redis.addCacheRedis(uuid, JSON.stringify(data));

          return data;
      }
    } catch (error) {
      await ModelLogErrors.create({ uuid, params: '', error: error.stack });
      return false;
    }
  }
}

export default new SearchResultDomainService();
