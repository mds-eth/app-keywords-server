import Sequelize, { Model } from 'sequelize';

class FinishedJobs extends Model {
  static init(sequelize) {
    super.init(
      {
        uuid: Sequelize.STRING,
        job: Sequelize.STRING,
        params: Sequelize.JSON,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default FinishedJobs;
