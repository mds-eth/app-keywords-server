import { encode } from 'js-base64';

import axios from 'axios';

import ModelApiForSeo from '../app/models/ApiForSeo';

export default {
  key: 'JobInsertApiDataSeo',
  async handle(values) {
    const { word1, word2, uuid } = values;
    const auth = await this.getAuthEncodeApiForSeo();
    const params = await this.returnArrayParams(word1, word2);

    const headers = {
      Authorization: `Basic ${auth}`,
    };

    const response = await axios.post(`${process.env.API_FOR_SEO}v3/serp/google/organic/live/advanced`, params, headers);

    if (response.status === 200) {
      const data = response.data;

      if (data.tasks !== null) {
        await this.saveBDReturnApiForSeo(uuid, response.data.tasks[0].result[0].items);
      }
    }
  },

  async returnArrayParams(word1, word2) {
    try {
      const data = [];
      const postArray = {
        language_name: 'Portuguese',
        location_code: 2076,
        location_name: 'Brazil',
        language_code: 'pt',
        depth: 10,
        keyword: utf8.encode(`${word1}+${word2}`),
      };

      data.push(postArray);

      return data;
    } catch (error) {}
  },

  async saveBDReturnApiForSeo(uuid, returnApi) {
    try {
      for (var i in returnApi) {
        const search = returnApi[i];

        const domain = search.domain;

        if (domain === null || domain === undefined || domain === '') continue;

        const type = search.type;
        const rank_group = search.rank_group;
        const rank_absolute = search.rank_absolute;
        const position = search.position;
        const xpath = search.xpath;
        const title = search.title;
        const url = search.url;
        const breadcrumb = search.breadcrumb === undefined ? '' : search.breadcrumb;
        const description = search.description === undefined ? '' : search.description;
        const links = search.links === undefined ? '' : search.links;
        const faq = search.faq === undefined ? '' : search.faq;

        await ModelApiForSeo.create({
          uuid,
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
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async getAuthEncodeApiForSeo() {
    try {
      const concat = `${process.env.LOGIN_API_FOR_SEO}:${process.env.PASS_API_FOR_SEO}`;

      const auth64 = encode(concat);

      return auth64;
    } catch (error) {}
  },
};
