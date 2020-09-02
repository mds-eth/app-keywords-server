import Sequelize, { Model } from 'sequelize';

class IndexPageGoogle extends Model {
  static init(sequelize) {
    super.init(
      {
        domain: Sequelize.STRING,
        response: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default IndexPageGoogle;
