import ModelMozResults from '../models/MozResults';

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
    } catch (error) { }
  }
}

export default new ApiMozService();
