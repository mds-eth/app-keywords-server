import axios from 'axios';

import MozResults from '../app/models/MozResults';

import Helpers from '../helpers/Helpers';

class JobInsertApiMoz
{
  constructor()
  {
    this.key = 'JobInsertApiMoz';
    this.options = {
      attemps: 2,
    };
  }

  async handle(values)
  {
    try {
      
      const { uuid, domains } = values.data;

      const expires = Math.floor(Date.now() / 1000) + 5000;
      const accessId = process.env.API_MOZ_ID;

      const cols = '103079215108';

      const urlApiMoz = process.env.URL_API_MOZ;
      const stringToSign = accessId + '\n' + expires;

      let signature = await Helpers.returnBinaryFunctionHmac(stringToSign);

      signature = encodeURIComponent(signature);

      for (var i in domains) {
        const domain = domains[i];

        const urlRequest = `https://${domain}`;

        const url = `${urlApiMoz}/url-metrics/${urlRequest}?Cols=${cols}&AccessID=${accessId}&Expires=${expires}&Signature=${signature}`;

        const response = await axios.post(url);

        if (response.status === 200) {
          const { upa, pda } = response.data;

          await MozResults.create({ uuid, url: urlRequest, upa, pda });
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

export default new JobInsertApiMoz();
