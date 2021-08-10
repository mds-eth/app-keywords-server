'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
  {
    return queryInterface.createTable('alexa_rank_results', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      uuid: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      domain: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      site_rank: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      top_keywords: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      similar_sites: {
        type: Sequelize.JSON,
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
  down: (queryInterface) =>
  {
    return queryInterface.dropTable('alexa_rank_results');
  },
};
