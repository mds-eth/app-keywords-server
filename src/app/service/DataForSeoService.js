import { v4 as uuidv4 } from 'uuid';

import { encode } from 'js-base64';
import isValidDomain from 'is-valid-domain';

import utf8 from 'utf8';

import Queue from '../../lib/Queue';

import ModelLogErros from '../models/LogErrors';
import ModelApiForSeo from '../models/ApiForSeo';

import InsertApiDataSeo from '../../jobs/InsertApiDataSeo';

class DataForSeoService
{
  constructor()
  {

    this.status = true;
    this.message = '';
  }

  async createProcessQueueApis(word1, word2)
  {
    try {

      const uuid = uuidv4();

      const data = {
        uuid,
        word1,
        word2,
      };
      await Queue.add(InsertApiDataSeo.key, data);

      return uuid;
    } catch (error) {
      this.status = false;
      this.message = `Error connect api: ${process.env.API_FOR_SEO}`;
    }
  }

  async returnArrayParams(word1, word2, site = '')
  {
    const data = [];
    const postArray = {
      language_name: 'Portuguese',
      location_code: 2076,
      location_name: 'Brazil',
      language_code: 'pt',
      depth: 10,
      keyword: site === '' ? utf8.encode(`${word1}+${word2}`) : `site: ${site}`,
    };

    data.push(postArray);

    return data;
  }

  async getAuthEncodeApiForSeo()
  {
    try {

      const concat = `${process.env.LOGIN_API_FOR_SEO}:${process.env.PASS_API_FOR_SEO}`;

      const auth64 = encode(concat);

      return auth64;
    } catch (error) {
      await ModelLogErros.create({ uuid, params: '', error: error.stack });
    }
  }

  async saveBDReturnApiForSeo(uuid, returnApi)
  {
    try {

      const domains = [];
      const isProd = (process.env.NODE_ENV === 'production');

      const limitLoop = isProd ? returnApi.length : 5;

      for (var i = 0; i <= limitLoop; i++) {
        const search = returnApi[i];

        if (search === undefined) continue;

        const domain = search.domain;

        if (isValidDomain(domain)) {

          const type = search.type;
          const rank_group = search.rank_group;
          const rank_absolute = search.rank_absolute;
          const position = search.position;
          const title = search.title;
          const url = search.url;
          const breadcrumb = search.breadcrumb === undefined ? '' : search.breadcrumb;
          const description = search.description === undefined ? '' : search.description;
          const links = search.links === undefined ? '' : search.links;
          const faq = search.faq === undefined ? '' : search.faq;

          await ModelApiForSeo.create({ uuid, type, rank_group, rank_absolute, position, domain, title, url, breadcrumb, description, links, faq, });
          domains.push(domain);
        } else {
          continue;
        }
      }

      return domains;
    } catch (error) {
      await ModelLogErros.create({ uuid, params: returnApi, error: error.stack });
      return false;
    }
  }
}

export default new DataForSeoService();
