import axios from 'axios';

import { encode } from 'js-base64';

class SearchGoogleService {
  constructor() {
    this.status = true;
    this.message = '';
  }

  async searchAPISGoogleKeyword(word1, word2) {
    try {
      const response = await axios.get(`${process.env.API_FOR_SEO}v3/keywords_data/google/search_volume/tasks_ready`, {
        headers: {
          Authorization: `Basic ${encode(process.env.LOGIN_API_FOR_SEO)}:${encode(process.env.PASS_API_FOR_SEO)}`,
        },
      });

      console.log(response);
    } catch (error) {
      console.log(error);

      console.log(`Basic ${encode(process.env.LOGIN_API_FOR_SEO)}:${encode(process.env.PASS_API_FOR_SEO)}`);
      this.status = false;
      this.message = `Error connect api: ${process.env.API_FOR_SEO}`;
    }
  }
}

export default new SearchGoogleService();
