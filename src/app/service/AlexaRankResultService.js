import ModelAlexaRank from '../models/AlexaRank';
import ModelLogErrors from '../models/LogErrors';

class AlexaRankResultService
{

  async getResultAlexaRankgUUID(uuid)
  {

    try {

      const response = await ModelAlexaRank.findAll({
        where: { uuid },
        attributes: ['domain', 'site_rank', 'top_keywords', 'similar_sites']
      });

      if (response) return response;

      return false;

    } catch (error) {
      await ModelLogErrors.create({ uuid, params: '', error: error.stack });
      return false;
    }

  }
}

export default new AlexaRankResultService();