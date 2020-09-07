import BaseService from '../app/service/BaseService';

import ModelPerformanceUrls from '../app/models/PerformanceUrls';

class JobInsertPerformanceUrls
{
  constructor()
  {
    this.key = 'JobInsertPerformanceUrl';
    this.options = {
      attemps: 2,
      priority: 4
    };
  }

  async handle(values)
  {
    try {

      const { uuid, domains } = values.data;

      const strategys = ['DESKTOP', 'MOBILE'];
      const apiPageSpeed = process.env.API_PAGE_SPEED_ONLINE_GOOGLE;
      for (var i in strategys) {
        for (var j in domains) {
          const domain = domains[j];

          const url = `https://${domain}`;

          const urlRequest = `${apiPageSpeed}?strategy=${strategys[i]}&locale=pt-BR&url=${url}&key=${process.env.API_KEY_GOOGLE_SPEED}`;

          const response = await BaseService.callAPI('GET', null, urlRequest, null);

          if (!response) continue;

          if (response.status === 200) {
            const strategy = strategys[i];
            const performance = response.data.lighthouseResult.categories.performance;

            const pontuation = performance.score * 100;

            const score = pontuation.toString();
            const audit_refs = performance.auditRefs;

            await ModelPerformanceUrls.create({ uuid, strategy, url, score, audit_refs });
          }
        }
      }

      return true;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new JobInsertPerformanceUrls();
