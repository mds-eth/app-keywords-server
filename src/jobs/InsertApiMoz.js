import BaseService from '../app/service/BaseService';

import MozResults from '../app/models/MozResults';
import ModelLogErrors from '../app/models/LogErrors';

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
    const { uuid, domains } = values.data;

    const expires = Math.floor(Date.now() / 1000) + 5000;
    const accessId = process.env.API_MOZ_ID;

    const cols = '103079215108';

    const urlApiMoz = process.env.URL_API_MOZ;
    const stringToSign = accessId + '\n' + expires;

    let signature = await Helpers.returnBinaryFunctionHmac(stringToSign);

    signature = encodeURIComponent(signature);

    try {

      for (var i in domains) {
        const domain = domains[i];

        const url = `https://${domain}`;

        const urlRequest = `${urlApiMoz}/url-metrics/${url}?Cols=${cols}&AccessID=${accessId}&Expires=${expires}&Signature=${signature}`;

        const response = await BaseService.callAPI('POST', null, urlRequest, null, uuid);

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
      await ModelLogErrors.create({ uuid, params: values, error: error.stack });
      return false;
    }
  }
}

export default new JobInsertApiMoz();
