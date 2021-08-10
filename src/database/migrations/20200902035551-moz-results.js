'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
  {
    return queryInterface.createTable('moz_results', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      uuid: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      }, ueid: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      uid: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      upa: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pda: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('moz_results');
  },
};
