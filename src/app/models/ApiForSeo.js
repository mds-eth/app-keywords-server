import Sequelize, { Model } from 'sequelize';

class ApiForSeo extends Model {
  static init(sequelize) {
    super.init(
      {
        params: Sequelize.JSON,
        keyword: Sequelize.STRING,
        location_code: Sequelize.INTEGER,
        language_code: Sequelize.STRING,
        keyword_info: Sequelize.JSON,
        impressions_info: Sequelize.JSON,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default ApiForSeo;
