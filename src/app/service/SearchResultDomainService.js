import ModelApiForSeo from '../models/ApiForSeo';

import ApiMozService from '../service/ApiMozService';
import PerformanceUrlService from './PerformanceUrlService';
import GoogleIndexPagesService from './GoogleIndexPagesService';

class SearchResultDomainService {
  async getResults(uuid) {
    try {
      const response = await ModelApiForSeo.findAll({
        where: { uuid },
        attributes: ['domain'],
      });

      if (response.length > 0) {
        const moz = await ApiMozService.callApiMoz(uuid, response);

        const data = await GoogleIndexPagesService.getURLPageGoogle(uuid, response);
        const responseAnalyze = await PerformanceUrlService.configureCallAPIGoogleSpeed(uuid, response);

        return true;
      } else {
        return this.returnMessageError('Domains Not Found.');
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new SearchResultDomainService();
