import Sequelize, { Model } from 'sequelize';

class FailedJobs extends Model {
  static init(sequelize) {
    super.init(
      {
        uuid: Sequelize.STRING,
        job: Sequelize.STRING,
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

export default FailedJobs;
