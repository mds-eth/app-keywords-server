import utf8 from 'utf8';

import { v4 as uuidv4 } from 'uuid';

import Queue from '../../lib/Queue';

import InsertApiDataSeo from '../../jobs/InsertApiDataSeo';

import BaseService from './BaseService';

class DataForSeoService extends BaseService {
  constructor() {
    super();

    this.status = true;
    this.message = '';
  }

  async createProcessQueueApis(word1, word2) {
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

  async returnMessageError(message) {
    this.status = false;
    this.message = message;

    return false;
  }
}

export default new DataForSeoService();
