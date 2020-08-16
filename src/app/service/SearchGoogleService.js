import BaseService from './BaseService';

class SearchGoogleService extends BaseService {
  constructor() {
    super();
  }

  async configureCallAPIGoogleSpeed(urls) {
    try {
      for (var i in urls) {
        const urlSearch = urls[i];

        if (urlSearch.url === null) continue;

        const url = `${process.env.API_PAGE_SPEED_ONLINE_GOOGLE}?url=${urlSearch.url}&key=${process.env.API_KEY_GOOGLE_SPEED}`;

        const response = await this.callAPI('GET', null, url, null);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }
}

export default new SearchGoogleService();
