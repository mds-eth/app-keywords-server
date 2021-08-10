import DataForSeoService from '../service/DataForSeoService';

class SearchGoogleController
{
    async searchKeyword(req, res)
    {
        const { palavra_1: word_1, palavra_2: word_2 } = req.body;

        if (word_1 === '' || word_2 === '') {
            return res.status(400).json({ status: false, message: 'Please send the required fields.' });
        }

        const { UUID } = req;

        const response = await DataForSeoService.createProcessQueueApis(UUID, word_1, word_2);

        if (!response) {
            return res.status(400).json({ status: false, message: 'Try again, error creating jobs to be queued.' });
        }
        return res.status(201).json({ status: true, uuid: response });
    }

    async rankedKeywords(req, res)
    {
        const response = await DataForSeoService.rankedKeywordService();

        if (!response) {
            return res.status(400).json({ status: false, message: 'Try again, error creating jobs to be queued.' });
        }
        return res.status(201).json({ status: true, uuid: response });
    }
}

export default new SearchGoogleController();
