import Sequelize, { Model } from 'sequelize';

class GoogleIndexPages extends Model {
  static init(sequelize) {
    super.init(
      {
        uuid: Sequelize.STRING,
        url: Sequelize.STRING,
        quantity_pages: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default GoogleIndexPages;
