import Sequelize, { Model } from 'sequelize';

class ApiForSeo extends Model {
  static init(sequelize) {
    super.init(
      {
        type: Sequelize.STRING,
        rank_group: Sequelize.STRING,
        rank_absolute: Sequelize.STRING,
        position: Sequelize.STRING,
        xpath: Sequelize.STRING,
        domain: Sequelize.STRING,
        title: Sequelize.STRING,
        url: Sequelize.STRING,
        breadcrumb: Sequelize.STRING,
        description: Sequelize.STRING,
        links: Sequelize.JSON,
        faq: Sequelize.JSON,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default ApiForSeo;
