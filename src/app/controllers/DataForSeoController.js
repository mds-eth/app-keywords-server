import DataForSeoService from '../service/DataForSeoService';

class SearchGoogleController {
  async searchKeyword(req, res) {
    const { palavra_1: word_1, palavra_2: word_2 } = req.body;

    if (word_1 === '' || word_2 === '') {
      return res.status(400).json({ status: false, message: 'Favor enviar os dois campos obrigatórios' });
    }

    const response = await DataForSeoService.searchAPISGoogleKeyword(word_1, word_2);

    if (!DataForSeoService.status) {
      return res.status(400).json({ status: false, message: DataForSeoService.message });
    }

    return res.status(201).json({ status: true, key: response });
  }
}

export default new SearchGoogleController();
