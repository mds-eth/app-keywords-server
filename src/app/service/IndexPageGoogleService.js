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

        if (response.status === 200) {
          const data = response.data;

          console.log(response);
          return;

          const cheerio = await this.loadCheerioURL(data);

          return;
        }
        return;
      }
    } catch (error) {}
  }

  async loadCheerioURL(returnURL) {
    try {

      console.log(returnURL);
      return;
      const response = await Cheerio.load(returnURL);

    } catch (error) {}
  }
}

export default new IndexPageGoogleService();
