const AlexaRank = require('alexa-rank-nodejs').default;

import ModelAlexaRank from '../app/models/AlexaRank';
import ModelLogErrors from '../app/models/LogErrors';

class JobAlexaRankResults
{
  constructor()
  {
    this.key = 'JobAlexaRankResults';
    this.options = {
      attemps: 1
    };
  }

  async handle(values)
  {
    const { uuid, domains } = values.data;

    try {

      for (var i in domains) {

        const domain = domains[i];

        var response = await AlexaRank.siteinfo(domain);

        if (response.status === 200) {

          const { site_rank, top_keywords, similar_sites } = response.data;

          await ModelAlexaRank.create({ uuid, domain, site_rank, top_keywords, similar_sites });
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

export default new JobAlexaRankResults();
