import ModelGoogleIndexPages from '../models/GoogleIndexPages';

import ModelLogErros from '../models/LogErrors';

class GoogleIndexPagesService 
{
    async getGoogleIndexPagesUUID(uuid)
    {
        try {

            const response = await ModelGoogleIndexPages.findAll({
                where: { uuid },
                attributes: ['url', 'quantity_pages'],
            });

            if (response.length > 0) {
                return response;
            }
            return false;
        } catch (error) {
            await ModelLogErros.create({ uuid, params: '', error: error.stack });
            return false;
        }
    }
}

export default new GoogleIndexPagesService();
