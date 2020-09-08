import Queue from '../lib/Queue';

import BaseService from '../app/service/BaseService';
import DataForSeoService from '../app/service/DataForSeoService';

import JobInsertApiMoz from './InsertApiMoz';
import JobInsertPerformanceUrl from './InsertPerformanceUrl';
import JobSearchTasksCreated from './SearchTaskCreated';
import JobInsertGoogleIndexPages from '../jobs/InsertGoogleIndexPages';
import JobInsertApiDataSeoGoogleIndexPages from './InsertIndexPagesApiForSeo';

class JobInsertApiDataSeo
{
  constructor()
  {
    this.key = 'JobInsertApiDataSeo';
    this.options = {
      attemps: 2,
      priority: 1
    };
  }

  async handle(values)
  {
    try {

      const { word1, word2, uuid } = values.data;

      const auth = await DataForSeoService.getAuthEncodeApiForSeo();
      const params = await DataForSeoService.returnArrayParams(word1, word2);

      const headers = {
        Authorization: `Basic ${auth}`,
      };

      const urlRequest = `${process.env.API_FOR_SEO}v3/serp/google/organic/live/advanced`;

      const response = await BaseService.callAPI('POST', params, urlRequest, headers);

      if (response.status === 200) {
        const data = response.data;

        if (data.tasks !== null) {
          const responseDomains = await DataForSeoService.saveBDReturnApiForSeo(uuid, response.data.tasks[0].result[0].items);

          if (!responseDomains) {
            return false;
          }

          const values = {
            uuid,
            domains: responseDomains,
          };

          //await Queue.add(JobInsertApiDataSeoGoogleIndexPages.key, values);
          await Queue.add(JobInsertApiMoz.key, values);
          await Queue.add(JobInsertGoogleIndexPages.key, values);
          await Queue.add(JobInsertPerformanceUrl.key, values);


          //await Queue.add(JobSearchTasksCreated.key, values);
          return true;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new JobInsertApiDataSeo();
