import SearchGoogleService from '../service/SearchGoogleService';

class SearchGoogleController {
  async searchKeyword(req, res) {
    const { palavra_1: word_1, palavra_2: word_2 } = req.body;

    if (word_1 === '' || word_2 === '') {
      return res.status(400).json({ status: false, message: 'Favor enviar os dois campos obrigatórios' });
    }

    const response = await SearchGoogleService.searchAPISGoogleKeyword(word_1, word_2);

    if (!SearchGoogleService.status) {
      return res.status(400).json({ status: false, message: SearchGoogleService.message });
    }

    return res.status(200).json({ status: true, response });
  }

  async getReturnApi(req, res) {
    const response = await SearchGoogleService.getReturnApi();

    if (!SearchGoogleService.status) {
      return res.status(400).json({ status: false, message: SearchGoogleService.message });
    }
    return res.status(200).json({ status: true, response: response });
  }
}

export default new SearchGoogleController();
