'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
  {
    return queryInterface.createTable('log_requests_apis', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      method: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      params: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      api: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      headers: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      response: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      input: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      exit: {
        type: Sequelize.DATE,
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
  down: (queryInterface) =>
  {
    return queryInterface.dropTable('log_requests_apis');
  },
};
