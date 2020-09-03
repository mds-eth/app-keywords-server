import utf8 from 'utf8';

import { v4 as uuidv4 } from 'uuid';

import Queue from '../../lib/Queue';

import InsertApiDataSeo from '../../jobs/InsertApiDataSeo';

import BaseService from './BaseService';
import ModelApiForSeo from '../models/ApiForSeo';

class DataForSeoService extends BaseService {
  constructor() {
    super();

    this.status = true;
    this.message = '';
  }

  async searchAPISGoogleKeyword(word1, word2) {
    try {
      await Queue.add(InsertApiDataSeo.key);
    } catch (error) {
      this.status = false;
      this.message = `Error connect api: ${process.env.API_FOR_SEO}`;
    }
  }



  async getAllReturnApiDataForSeo() {
    try {
      const response = await ModelApiForSeo.findAll();

      return response;
    } catch (error) {}
  }

  async returnMessageError(message) {
    this.status = false;
    this.message = message;

    return false;
  }
}

export default new DataForSeoService();
