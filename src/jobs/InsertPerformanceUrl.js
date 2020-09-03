import axios from 'axios';

import ModelPerformanceUrls from '../app/models/PerformanceUrls';

class JobInsertPerformanceUrls {
  constructor() {
    this.key = 'JobInsertPerformanceUrl';
    this.options = {
      attemps: 2,
    };
  }

  async handle(values) {
    try {
      const { uuid, domains } = values.data;

      const strategys = ['DESKTOP', 'MOBILE'];
      const apiPageSpeed = process.env.API_PAGE_SPEED_ONLINE_GOOGLE;
      for (var i in strategys) {
        for (var j in domains) {
          const domain = domains[j];

          const urlRequest = `https://${domain.domain}`;

          const url = `${apiPageSpeed}?strategy=${strategys[i]}&locale=pt-BR&url=${urlRequest}&key=${process.env.API_KEY_GOOGLE_SPEED}`;

          const input = new Date();

          const response = await axios.get(url);

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
    } catch (error) {}
  }
}

export default new JobInsertPerformanceUrls();
