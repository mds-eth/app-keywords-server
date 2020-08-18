import Sequelize, { Model } from 'sequelize';

class PerformanceUrls extends Model {
  static init(sequelize) {
    super.init(
      {
        strategy: Sequelize.STRING,
        url: Sequelize.STRING,
        score: Sequelize.STRING,
        audit_refs: Sequelize.JSON,
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

export default PerformanceUrls;
