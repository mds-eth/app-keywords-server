import { validate as uuidValidate } from 'uuid';

import SearchResultDomainService from '../service/SearchResultDomainService';

class SearchResultController {
  async getResultDomains(req, res) {
    const { key } = req.params;

    if (key === '' || !uuidValidate(key)) {
      return res.status(400).json({ status: false, message: 'Key invalid.' });
    }
    const response = await SearchResultDomainService.getResults(key);

    if (!DataForSeoService.status) {
      return res.status(400).json({ status: false, message: DataForSeoService.message });
    }
    return res.status(200).json({ status: true, response });
  }
}

export default new SearchResultController();
