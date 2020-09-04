import axios from 'axios';

import Queue from '../lib/Queue';

import InsertApiMoz from './InsertApiMoz';
import InsertPerformanceUrl from './InsertPerformanceUrl';
import InsertGoogleIndexPages from './InsertGoogleIndexPages';

import DataForSeoService from '../app/service/DataForSeoService';

class JobInsertApiDataSeo {
  constructor() {
    this.key = 'JobInsertApiDataSeo';
    this.options = {
      attemps: 2,
    };
  }

  async handle(values) {
    try {
      const { word1, word2, uuid } = values.data;

      const auth = await DataForSeoService.getAuthEncodeApiForSeo();
      const params = await DataForSeoService.returnArrayParams(word1, word2);

      const response = await axios.post(`${process.env.API_FOR_SEO}v3/serp/google/organic/live/advanced`, params, {
        timeout: 60 * 4 * 1000,
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });

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

          await Queue.add(InsertApiMoz.key, values);
          await Queue.add(InsertGoogleIndexPages.key, values);
          await Queue.add(InsertPerformanceUrl.key, values);

          return true;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new JobInsertApiDataSeo();
