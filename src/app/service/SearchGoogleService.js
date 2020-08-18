import BaseService from './BaseService';

import ModelPerformanceUrls from '../models/PerformanceUrls';

class SearchGoogleService extends BaseService {
  constructor() {
    super();
  }

  async configureCallAPIGoogleSpeed(domains) {
    try {
      
      const strategys = ['DESKTOP', 'MOBILE'];
      for (var i in strategys) {
        for (var j in domains) {
          const domain = domains[j];

          if (domain.domain === null) continue;

          const urlRequest = `https://${domain.domain}`;

          const url = `${process.env.API_PAGE_SPEED_ONLINE_GOOGLE}?category=PERFORMANCE&strategy=${strategys[i]}&url=${urlRequest}&key=${process.env.API_KEY_GOOGLE_SPEED}`;

          const input = new Date();

          const response = await this.callAPI('GET', null, url, null);

          const exit = new Date();

          if (response.status === 200) {
            const strategy = strategys[i];
            const performance = response.data.lighthouseResult.categories.performance;

            const score = performance.score.toString();
            const audit_refs = JSON.stringify(performance.auditRefs);

            await ModelPerformanceUrls.create({ strategy, url: urlRequest, score, audit_refs, input, exit });
          }
        }
      }
      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  }
}

export default new SearchGoogleService();
