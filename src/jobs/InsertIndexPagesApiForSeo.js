import BaseService from '../app/service/BaseService';

import ModelLogErrors from '../app/models/LogErrors';
import DataForSeoService from '../app/service/DataForSeoService';

class JobInsertApiDataSeoGoogleIndexPages
{
  constructor()
  {
    this.key = 'JobInsertApiDataSeoGoogleIndexPages';
    this.options = {
      attemps: 3,
      priority: 2
    };
  }

  async handle(values)
  {

    const { domains, uuid } = values.data;

    const auth = await DataForSeoService.getAuthEncodeApiForSeo();

    const headers = {
      Authorization: `Basic ${auth}`,
    };

    const url = `${process.env.API_FOR_SEO}v3/serp/google/organic/task_post`;

    try {

      for (var i in domains) {
        const domain = domains[i];

        const params = await DataForSeoService.returnArrayParams('', '', domain);

        const response = await BaseService.callAPI('POST', params, url, headers, uuid);

        if (!response) continue;

        if (response.status === 200) {

          const data = response.data;

          const dataCreate = await DataForSeoService.createGoogleIndex(uuid, data.tasks[0]);

        }
      }
    } catch (error) {
      await ModelLogErrors.create({ uuid, params: values, error: error.stack });
      return false;
    }
  }
}

export default new JobInsertApiDataSeoGoogleIndexPages();
