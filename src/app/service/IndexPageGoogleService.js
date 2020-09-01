import Cheerio from 'cheerio';

import BaseService from './BaseService';

class IndexPageGoogleService extends BaseService {
  constructor() {
    super();
  }
  async getURLPageGoogle(domains) {
    try {
      for (var i in domains) {
        const domain = domains[i];

        if (domain.domain === null) continue;

        const urlRequest = `https://${domain.domain}`;

        const url = `https://www.google.com/search?q=${urlRequest}`;

        const response = await this.callAPI('GET', null, url, null);

        console.log(response);
        return;
        if (response.status === 200) {
          const data = response.data;

          const cheerio = await this.loadCheerioURL(data);

          return;
        }
        return;
      }
    } catch (error) {}
  }

  async loadCheerioURL(returnURL) {
    try {
    
    } catch (error) {
      console.log(error);
    }
  }
}

export default new IndexPageGoogleService();
