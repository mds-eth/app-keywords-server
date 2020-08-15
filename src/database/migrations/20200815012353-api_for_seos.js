'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('api_for_seos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rank_group: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      rank_group: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      rank_absolute: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      position: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      xpath: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      domain: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cache_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      breadcrumb: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_image: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      is_video: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      is_featured_snippet: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      is_malicious: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pre_snippet: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      extended_snippet: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      amp_version: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      rating: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      highlighted: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      links: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      faq: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('api_for_seos');
  },
};
