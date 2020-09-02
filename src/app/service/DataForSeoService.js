import utf8 from 'utf8';
import { encode } from 'js-base64';

import BaseService from './BaseService';
import ModelApiForSeo from '../models/ApiForSeo';

import ApiMozService from '../service/ApiMozService';
import PerformanceUrlService from './PerformanceUrlService';
import IndexPageGoogleService from './IndexPageGoogleService';

class DataForSeoService extends BaseService {
  constructor() {
    super();

    this.status = true;
    this.message = '';
  }

  async searchAPISGoogleKeyword(word1, word2) {
    try {
      const auth = await this.getAuthEncodeApiForSeo();
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

        await this.callAPIGoogle();
        return response.data.tasks;
      } else {
        return this.returnMessageError('Erro ao chamar api google');
      }
    } catch (error) {
      this.status = false;
      this.message = `Error connect api: ${process.env.API_FOR_SEO}`;
    }
  }

  async getDomainsDataForSeo() {
    try {
      const response = await ModelApiForSeo.findAll({
        attributes: ['domain'],
      });

      if (response.length > 0) {
        const moz = await ApiMozService.callApiMoz(response);
        //const data = await IndexPageGoogleService.getURLPageGoogle(response);
        //const responseAnalyze = await PerformanceUrlService.configureCallAPIGoogleSpeed(response);

        return true;
      } else {
        return this.returnMessageError('Domains Not Found.');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async callGetApiSerp(id) {
    try {
      const response = await this.callAPI(`${process.env.API_FOR_SEO}v3/serp/google/organic/task_get/regular/${id}`, {
        headers: {
          Authorization: `Basic ${this.auth}`,
        },
      });

      return response.data.tasks[0].result[0];
    } catch (error) {}
  }

  async saveBDReturnApiForSeo(returnApi) {
    try {
      for (var i in returnApi) {
        const search = returnApi[i];

        const type = search.type;
        const rank_group = search.rank_group;
        const rank_absolute = search.rank_absolute;
        const position = search.position;
        const xpath = search.xpath;
        const domain = search.domain;

        if (domain === null || domain === undefined) continue;
        const title = search.title;
        const url = search.url;
        const breadcrumb = search.breadcrumb === undefined ? '' : search.breadcrumb;
        const description = search.description === undefined ? '' : JSON.stringify(search.description);
        const links = search.links === undefined ? '' : JSON.stringify(search.links);
        const faq = search.faq === undefined ? '' : JSON.stringify(search.faq);

        await ModelApiForSeo.create({
          type,
          rank_group,
          rank_absolute,
          position,
          xpath,
          domain,
          title,
          url,
          breadcrumb,
          description,
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
        location_name: 'Brazil',
        language_code: 'pt',
        depth: 10,
        keyword: utf8.encode(word1, word2),
      };

      data.push(postArray);

      return data;
    } catch (error) {}
  }

  async getAllReturnApiDataForSeo() {
    try {
      const response = await ModelApiForSeo.findAll();

      return response;
    } catch (error) {}
  }

  async getAuthEncodeApiForSeo() {
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

export default new DataForSeoService();
