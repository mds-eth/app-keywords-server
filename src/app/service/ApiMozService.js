import ModelMozResults from '../models/MozResults';

import ModelLogErrors from '../models/LogErrors';

class ApiMozService
{
    async getResultMozUUID(uuid)
    {
        try {

            const response = await ModelMozResults.findAll({
                where: { uuid },
                attributes: ['url', 'ueid', 'uid', 'upa', 'pda'],
            });

            if (response.length > 0) {
                return response;
            }
            return false;
        } catch (error) {
            await ModelLogErrors.create({ uuid, params: '', error: error.stack });
            return false;
        }
    }
}

export default new ApiMozService();
