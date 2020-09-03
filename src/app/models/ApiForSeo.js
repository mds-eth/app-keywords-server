import Sequelize, { Model } from 'sequelize';

class ApiForSeo extends Model {
  static init(sequelize) {
    super.init(
      {
        uuid: Sequelize.STRING,
        type: Sequelize.STRING,
        rank_group: Sequelize.STRING,
        rank_absolute: Sequelize.STRING,
        position: Sequelize.STRING,        
        domain: Sequelize.STRING,
        title: Sequelize.STRING,
        url: Sequelize.STRING,
        breadcrumb: Sequelize.STRING,
        description: Sequelize.JSON,
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
