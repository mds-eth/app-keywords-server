import Sequelize, { Model } from 'sequelize';

class LogErrors extends Model
{
  static init(sequelize)
  {
    super.init(
      {
        uuid: Sequelize.STRING,
        params: Sequelize.JSON,
        error: Sequelize.JSON,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default LogErrors;
