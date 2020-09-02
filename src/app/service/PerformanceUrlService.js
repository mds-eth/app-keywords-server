import BaseService from './BaseService';

import ModelPerformanceUrls from '../models/PerformanceUrls';

class PerformanceUrlService extends BaseService {
  constructor() {
    super();
  }

  async configureCallAPIGoogleSpeed(uuid, domains) {
    try {
      const strategys = ['DESKTOP', 'MOBILE'];
      const apiPageSpeed = process.env.API_PAGE_SPEED_ONLINE_GOOGLE;
      for (var i in strategys) {
        for (var j in domains) {
          const domain = domains[j];

          const urlRequest = `https://${domain.domain}`;

          const url = `${apiPageSpeed}?strategy=${strategys[i]}&locale=pt-BR&url=${urlRequest}&key=${process.env.API_KEY_GOOGLE_SPEED}`;

          const input = new Date();

          const response = await this.callAPI('GET', null, url, null);

          if (!response) continue;

          const exit = new Date();

          if (response.status === 200) {
            const strategy = strategys[i];
            const performance = response.data.lighthouseResult.categories.performance;

            const score = performance.score.toString();
            const audit_refs = JSON.stringify(performance.auditRefs);

            await ModelPerformanceUrls.create({ uuid, strategy, url: urlRequest, score, audit_refs, input, exit });
          }
        }
      }
      return true;
    } catch (error) {
      console.log(error.data);

      return false;
    }
  }
}

export default new PerformanceUrlService();
