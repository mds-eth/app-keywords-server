import ModelLogErrors from '../app/models/LogErrors';

import BaseService from '../app/service/BaseService';
import DataForSeoService from '../app/service/DataForSeoService';

class JobInsertDomainIntersection
{
    constructor()
    {
        this.key = 'JobInsertDomainIntersection';
        this.options = {
            attemps: 2,
            priority: 1
        };
    }

    async handle(values)
    {
        const { uuid, domains } = values.data;

        const auth = await DataForSeoService.getAuthEncodeApiForSeo();
        const params = await DataForSeoService.returnArrayParams(word1, word2);

        const headers = {
            Authorization: `Basic ${auth}`,
        };

        const urlRequest = `${process.env.API_FOR_SEO}v3/dataforseo_labs/domain_intersection/live`;

        try {

            const response = await BaseService.callAPI('POST', params, urlRequest, headers, uuid);

            if (response.status === 200) {
                const data = response.data;


            }
        } catch (error) {
            await ModelLogErrors.create({ uuid, params: values, error: error.stack });
            return false;
        }
    }
}

export default new JobInsertDomainIntersection();
