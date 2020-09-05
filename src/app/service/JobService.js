import ModelFinishJobs from '../models/FinishedJobs';

class JobService
{

    async getKeywordsUUID(uuid)
    {

        try {

            const response = await ModelFinishJobs.findOne({ where: { uuid } });

            if (response) {

                return response.params;
            }
            return false;

        } catch (error) {

        }

    }
}

export default new JobService();