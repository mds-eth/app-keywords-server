import Sequelize, { Model } from 'sequelize';

class LogRequestsApi extends Model
{
  static init(sequelize)
  {
    super.init(
      {
        method: Sequelize.STRING,
        params: Sequelize.JSON,
        api: Sequelize.STRING,
        headers: Sequelize.JSON,
        response: Sequelize.JSON,
        input: Sequelize.DATE,
        exit: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default LogRequestsApi;
