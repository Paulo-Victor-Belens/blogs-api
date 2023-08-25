'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'blog_posts', {
        id: {
          allwNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        title: {
          allwNull: false,
          type: Sequelize.STRING,
        },
        content: {
          allwNull: false,
          type: Sequelize.STRING,
        },
        user_id: {
          allwNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        published: {
          allwNull: false,
          type: Sequelize.DATE,
        },
        updated: {
          allwNull: false,
          type: Sequelize.DATE,
        },
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('blog_posts');
  }
};
