import DataForSeoService from '../service/DataForSeoService';

class SearchGoogleController
{
  async searchKeyword(req, res)
  {

    const { palavra_1: word_1, palavra_2: word_2 } = req.body;

    if (word_1 === '' || word_2 === '') {
      return res.status(400).json({ status: false, message: 'Favor enviar os campos obrigatórios.' });
    }

    const response = await DataForSeoService.createProcessQueueApis(word_1, word_2);

    if (!response) {
      return res.status(400).json({ status: false, message: 'Tente novamente, erro ao criar jobs à serem enfileirados.' });
    }
    return res.status(201).json({ status: true, uuid: response });
  }
}

export default new SearchGoogleController();
