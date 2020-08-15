import axios from 'axios';

import utf8 from 'utf8';
import { encode } from 'js-base64';

import BaseService from './BaseService';
import ModelApiForSeo from '../models/ApiForSeo';

class SearchGoogleService extends BaseService {
  constructor() {
    super();

    this.status = true;
    this.message = '';
  }

  async searchAPISGoogleKeyword(word1, word2) {
    try {
      const auth = await this.getHeadersApiForSeo();
      const params = await this.returnArrayParams(word1, word2);

      const response = await this.callAPI(
        'POST',
        params,
        `${process.env.API_FOR_SEO}v3/serp/google/organic/live/advanced`,
        `Basic ${auth}`
      );

      if (response.status === 200) {
        const data = response.data;

        if (data.tasks === null) {
          return this.returnMessageError('Tasks retornou null.');
        }

        await this.saveBDReturnApiForSeo(response.data.tasks[0].result[0].items);

        return response.data.tasks;
      } else {
        return this.returnMessageError('Erro ao chamar api google');
      }
    } catch (error) {
      this.status = false;
      this.message = `Error connect api: ${process.env.API_FOR_SEO}`;
    }
  }

  async callGetApiSerp(id) {
    try {
      const response = await axios.get(`${process.env.API_FOR_SEO}v3/serp/google/organic/task_get/regular/${id}`, {
        headers: {
          Authorization: `Basic ${this.auth}`,
        },
      });

      console.log(response.data.tasks[0].result[0]);

      return response.data.tasks[0].result[0];
    } catch (error) {}
  }

  async saveBDReturnApiForSeo(returnApi) {
    try {
      console.log(returnApi);
      return;
      for (var i in returnApi) {
        const search = returnApi[i];

        const type = search.type;
        const rank_group = search.rank_group;
        const rank_absolute = search.rank_absolute;
        const position = search.position;
        const xpath = search.xpath;
        const domain = search.domain;
        const title = search.title;
        const url = search.url;
        const cache_url = search.cache_url;
        const breadcrumb = search.breadcrumb;
        const is_image = search.is_image;
        const is_video = search.is_video;
        const is_featured_snippet = search.is_featured_snippet;
        const is_malicious = search.is_malicious;
        const description = search.description;
        const pre_snippet = search.pre_snippet;
        const extended_snippet = JSON.stringify(search.extended_snippet);
        const amp_version = search.amp_version;
        const rating = JSON.stringify(search.rating);
        const highlighted = search.highlighted;
        const links = search.links;
        const faq = search.faq;

        await ModelApiForSeo.create({
          type,
          rank_group,
          rank_absolute,
          position,
          xpath,
          domain,
          title,
          url,
          cache_url,
          breadcrumb,
          is_image,
          is_video,
          is_featured_snippet,
          is_malicious,
          description,
          pre_snippet,
          extended_snippet,
          amp_version,
          rating,
          highlighted,
          links,
          faq,
        });
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
        language_name: 'Portuguese',
        location_code: 2076,
        language_code: 'pt',
        depth: 10,
        keyword: utf8.encode('facebook'),
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
