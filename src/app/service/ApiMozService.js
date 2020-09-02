import axios from 'axios';

import BaseService from './BaseService';
import ModelMozResults from '../models/MozResults';

import Helpers from '../helpers/Helpers';

class ApiMozService extends BaseService {
  constructor() {
    super();
  }

  async callApiMoz(uuid, domains) {
    try {
      var expires = Math.floor(Date.now() / 1000) + 5000;
      var accessId = process.env.API_MOZ_ID;

      var cols = '103079215108';

      const urlApiMoz = process.env.URL_API_MOZ;
      var stringToSign = accessId + '\n' + expires;

      var signature = await Helpers.returnBinaryFunctionHmac(stringToSign);

      signature = encodeURIComponent(signature);

      for (var i in domains) {
        const domain = domains[i];

        if (domain.domain === null) continue;

        const urlRequest = `https://${domain.domain}`;

        const url = `${urlApiMoz}/url-metrics/${urlRequest}?Cols=${cols}&AccessID=${accessId}&Expires=${expires}&Signature=${signature}`;

        const response = await axios.post(url);

        if (response.status === 200) {
          const { upa, pda } = response.data;

          await ModelMozResults.create({ uuid, url: urlRequest, upa, pda });
        } else {
          continue;
        }
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ApiMozService();
