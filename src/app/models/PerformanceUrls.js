import Sequelize, { Model } from 'sequelize';

class PerformanceUrls extends Model
{
  static init(sequelize)
  {
    super.init(
      {
        uuid: Sequelize.STRING,
        strategy: Sequelize.STRING,
        url: Sequelize.STRING,
        score: Sequelize.STRING,
        audit_refs: Sequelize.JSON
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default PerformanceUrls;
