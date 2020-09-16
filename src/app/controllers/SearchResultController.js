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
}

export default new SearchResultController();
