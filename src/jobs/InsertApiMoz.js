import BaseService from '../app/service/BaseService';

import MozResults from '../app/models/MozResults';

import Helpers from '../helpers/Helpers';

class JobInsertApiMoz
{
  constructor()
  {
    this.key = 'JobInsertApiMoz';
    this.options = {
      attemps: 2,
      priority: 2
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

        const domainRequest = `https://${domain}`;

        const url = `${urlApiMoz}/url-metrics/${domainRequest}?Cols=${cols}&AccessID=${accessId}&Expires=${expires}&Signature=${signature}`;

        const response = await BaseService.callAPI('POST', null, url, null);

        if (!response) continue;

        if (response.status === 200) {
          const { upa, pda } = response.data;

          await MozResults.create({ uuid, url, upa, pda });
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
