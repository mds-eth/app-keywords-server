import ModelApiForSeo from '../models/ApiForSeo';

import ApiMozService from '../service/ApiMozService';
import PerformanceUrlService from './PerformanceUrlService';
import GoogleIndexPagesService from './GoogleIndexPagesService';

class SearchResultDomainService {
  async getResults(uuid) {
    try {
      const response = await this.getAllDomains(uuid);

      if (!response) {
        return this.returnMessageError('Domains Not Found.');
      }

      const responseAnalyze = await PerformanceUrlService.configureCallAPIGoogleSpeed(uuid, response);

      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async callApiMoz(uuid) {
    try {
      const response = await this.getAllDomains(uuid);

      if (!response) {
        return this.returnMessageError('Domains Not Found.');
      }

      await ApiMozService.callApiMoz(uuid, response);
      await GoogleIndexPagesService.getURLPageGoogle(uuid, response);

      return true;
    } catch (error) {}
  }

  async getAllDomains(uuid) {
    try {
      const response = await ModelApiForSeo.findAll({
        where: { uuid },
        attributes: ['domain'],
      });

      if (response.length > 0) {
        return response;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}

export default new SearchResultDomainService();
