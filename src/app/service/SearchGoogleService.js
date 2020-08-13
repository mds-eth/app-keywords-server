import axios from 'axios';

import { encode } from 'js-base64';

import ModelApiForSeo from '../models/ApiForSeo';

class SearchGoogleService {
  constructor() {
    this.status = true;
    this.message = '';
  }

  async searchAPISGoogleKeyword(word1, word2) {
    try {
      const auth64 = await this.getHeadersApiForSeo();
      const params = await this.returnArrayParams(word1, word2);

      const response = await axios.post(`${process.env.API_FOR_SEO}v3/keywords_data/google/search_volume/task_post`, params, {
        headers: {
          Authorization: `Basic ${auth64}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;

        const idTask = data.tasks[0].id;

        console.log(idTask);

        const callGetSerp = await this.callGetApiSerp(idTask);

        return callGetSerp;
      } else {
        return this.returnArrayParams('Erro ao chamar api google');
      }
    } catch (error) {
      console.log(error);
      this.status = false;
      this.message = `Error connect api: ${process.env.API_FOR_SEO}`;
    }
  }

  async callGetApiSerp(id){

    try {

      const auth64 = await this.getHeadersApiForSeo();

      const response = await axios.get(`${process.env.API_FOR_SEO}v3/keywords_data/google/search_volume/task_get/${id}`,{
        headers: {
          Authorization: `Basic ${auth64}`,
        },
      });

      console.log(response.data);

      return response.data;
      
    } catch (error) {   
    }
  }

  async saveBDReturnApiForSeo(params, returnApi) {
    try {
      JSON.stringify(params);

      for (var i in returnApi) {
        const search = returnApi[i];

        const keyword = search.keyword;
        const location_code = search.location_code;
        const language_code = search.language_code;
        const keyword_info = JSON.stringify(search.keyword_info);
        const impressions_info = JSON.stringify(search.impressions_info);

        await ModelApiForSeo.create({ params, keyword, location_code, language_code, keyword_info, impressions_info });
      }

      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  }

  async returnArrayParams(word1, word2) {
    try {
      const data = [];
      const postArray = {
        location_name: 'Brazil',       
        language_name: 'Portuguese',
        location_code: 2076,
        country_iso_code: 'BR',
        keywords: [word1.trim(), word2.trim()],
      };

      data.push(postArray);

      return data;
    } catch (error) {}
  }

  async getReturnApi() {
    try {
      const response = await ModelApiForSeo.findOne({
        where: { id: 250 },
      });

      const keyword_info = JSON.parse(response.keyword_info);

      const impressions_info = JSON.parse(response.impressions_info);

      const array = {
        params: response.params,
        keyword_info: keyword_info,
        impressions_info: impressions_info,
      };

      return array;
    } catch (error) {}
  }

  async getHeadersApiForSeo() {
    try {
      const concat = `${process.env.LOGIN_API_FOR_SEO}:${process.env.PASS_API_FOR_SEO}`;

      const auth64 = encode(concat);

      return auth64;
    } catch (error) {}
  }

  async returnMessageError(message) {
    this.status = false;
    this.message = message;

    return false;
  }
}

export default new SearchGoogleService();
