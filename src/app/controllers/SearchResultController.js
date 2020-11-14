import SearchResultDomainService from '../service/SearchResultDomainService';

class SearchResultController
{
    async getResultDomains(req, res)
    {
        const { uuid } = req.params;

        const response = await SearchResultDomainService.getResultUUID(uuid);

        if (!response) {
            return res.status(400).json({ status: false, message: `Data not found for UUID: ${uuid}` });
        }
        return res.status(200).json({ status: true, uuid, response });
    }

    async getLastSerchsUser(req, res)
    {
        const { UUID } = req;

        const response = await SearchResultDomainService.getLastSearchsUser(UUID);

        if (!response) {
            return res.status(400).json({ status: false, message: `Data not found for UUID: ${UUID}` });
        }
        return res.status(200).json({ status: true, response });
    }

    async getDetailRegister(req, res)
    {
        const { uuid } = req.params;

        const response = await SearchResultDomainService.getDetailRegister(uuid);

        if (!response) {
            return res.status(400).json({ status: false, message: `Data not found for UUID: ${uuid}` });
        }
        return res.status(200).json({ status: true, response });
    }
}

export default new SearchResultController();
