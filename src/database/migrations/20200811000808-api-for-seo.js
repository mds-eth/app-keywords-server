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
      params: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      keyword: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location_code: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      language_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      keyword_info: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      impressions_info: {
        type: Sequelize.JSON,
        allowNull: false,
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
