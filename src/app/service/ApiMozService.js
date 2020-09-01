import crypto from 'crypto';
import { encode } from 'js-base64';
import axios from 'axios';
import urlencode from 'urlencode';

import BaseService from './BaseService';

import Helpers from '../helpers/Helpers';

class ApiMozService extends BaseService {
  constructor() {
    super();
  }

  async callApiMoz(domains) {
    try {
      const expires = Math.floor(new Date() / 1000) + 300;
      const stringToSign = `${process.env.API_MOZ_ID}\n${expires}`;

      const binary = await Helpers.returnBinaryFunctionHmac(stringToSign);

      const binaryIn64 = urlencode(encode(binary));

      for (var i in domains) {
        const domain = domains[i];

        if (domain.domain === null) continue;

        var urlRequest = `https://${domain.domain}`;

        const cols = '103079215108';

        const url = `http://lsapi.seomoz.com/linkscape/url-metrics/${urlencode(urlRequest)}?Cols=${cols}&AccessID=${process.env.API_MOZ_SECRET_KEY}&Expires=${expires}&Signature=${binaryIn64}`;

        const response = await axios.post(url);
        
        console.log(response);
        console.log(urlRequest);
        return;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }
}

export default new ApiMozService();
