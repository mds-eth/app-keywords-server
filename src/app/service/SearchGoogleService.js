import axios from 'axios';

import { encode } from 'js-base64';

class SearchGoogleService {
  constructor() {
    this.status = true;
    this.message = '';
  }

  async searchAPISGoogleKeyword(word1, word2) {
    try {
      const auth = `${process.env.LOGIN_API_FOR_SEO}:${process.env.PASS_API_FOR_SEO}`;

      const auth64 = encode(auth);

      const response = await axios.get(`${process.env.API_FOR_SEO}v3/keywords_data/google/search_volume/tasks_ready`, {
        headers: {
          Authorization: `Basic ${auth64}`,
        },
      });

      console.log(response);
    } catch (error) {
      this.status = false;
      this.message = `Error connect api: ${process.env.API_FOR_SEO}`;
    }
  }
}

export default new SearchGoogleService();
