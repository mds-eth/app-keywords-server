'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
  {
    return queryInterface.createTable('api_for_seos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      uuid_user: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      uuid: {
        type: Sequelize.STRING,
        allowNull: false,
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

      breadcrumb: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      description: {
        type: Sequelize.JSON,
        allowNull: true,
      },

      links: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      faq: {
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
    return queryInterface.dropTable('api_for_seos');
  },
};
