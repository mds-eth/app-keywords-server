import axios from 'axios';

import BaseService from './BaseService';

import Helpers from '../helpers/Helpers';

class ApiMozService extends BaseService {
  constructor() {
    super();
  }

  async callApiMoz(domains) {
    try {
      var expires = Math.floor(Date.now() / 1000) + 300;
      var accessId = process.env.API_MOZ_ID;

      var cols = '103079215108';

      var stringToSign = accessId + '\n' + expires;

      var signature = await Helpers.returnBinaryFunctionHmac(stringToSign);

      signature = encodeURIComponent(signature);

      for (var i in domains) {
        const domain = domains[i];

        if (domain.domain === null) continue;

        const urlRequest = `https://${domain.domain}`;

        const url = `${process.env.URL_API_MOZ}/url-metrics/${urlRequest}?Cols=${cols}&AccessID=${accessId}&Expires=${expires}&Signature=${signature}`;

        const response = await this.callAPI('POST', null, url, null);

        if (response.status === 200) {
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ApiMozService();
