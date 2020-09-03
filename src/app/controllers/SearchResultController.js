import { validate as uuidValidate } from 'uuid';

import SearchResultDomainService from '../service/SearchResultDomainService';

class SearchResultController {
  async getResultDomains(req, res) {
    const { uuid } = req.params;

    if (uuid === '' || !uuidValidate(uuid)) {
      return res.status(400).json({ status: false, message: 'Key invalid.' });
    }
    const response = await SearchResultDomainService.getAllDomains(uuid);

    if (!response) {
      return res.status(400).json({ status: false, message: response });
    }
    return res.status(200).json({ status: true, uuid, response });
  }
}

export default new SearchResultController();
