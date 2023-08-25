'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'users', {
        id: {
          allwNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        display_name: {
          allwNull: false,
          type: Sequelize.STRING,
        },
        email: {
          allwNull: false,
          unique: true,
          type: Sequelize.STRING,
        },
        password: {
          allwNull: false,
          type: Sequelize.STRING,
        },
        image: {
          allwNull: false,
          type: Sequelize.STRING,
        }
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('users');
  }
};
