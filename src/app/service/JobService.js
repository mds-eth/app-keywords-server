import ModelFinishJobs from '../models/FinishedJobs';
import ModelLogErros from '../models/LogErrors';

class JobService
{

  async getKeywordsUUID(uuid)
  {
    try {

      const response = await ModelFinishJobs.findOne({ where: { uuid, job: 'JobInsertApiDataSeo' } });

      if (response) {
        delete response.params.uuid;
        return response.params;
      }
      return false;

    } catch (error) {
      await ModelLogErros.create({ uuid, params: '', error: error.stack });
      return false;
    }
  }

  async getRegisterKeyword(uuid)
  {
    try {

      const response = await ModelFinishJobs.findOne({ where: { uuid, job: 'JobInsertApiDataSeo' } });

      return response ? response : false;
    } catch (error) {
      await ModelLogErros.create({ uuid, params: '', error: error.stack });
      return false;
    }
  }
}

export default new JobService();