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
        cache_url: Sequelize.STRING,
        breadcrumb: Sequelize.STRING,
        is_image: Sequelize.BOOLEAN,
        is_video: Sequelize.BOOLEAN,
        is_featured_snippet: Sequelize.BOOLEAN,
        is_malicious: Sequelize.BOOLEAN,
        description: Sequelize.STRING,
        pre_snippet: Sequelize.STRING,
        extended_snippet: Sequelize.JSON,
        amp_version: Sequelize.BOOLEAN,
        rating: Sequelize.JSON,
        highlighted: Sequelize.JSON,
        links: Sequelize.STRING,
        faq: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default ApiForSeo;
