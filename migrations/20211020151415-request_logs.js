'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('request_logs', {
      id: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
      },
      host: {
          type: Sequelize.STRING(255),
          allowNull: false,
      },
      method: {
          type: Sequelize.STRING(10),
          allowNull: false,
      },
      api_token: {
          type: Sequelize.STRING(255),
          allowNull: false,
      },
      user_agent: {
          type: Sequelize.STRING(255),
          allowNull: true,
      },
      base_url: {
          type: Sequelize.STRING(255),
          allowNull: true,
      },
      full_url: {
          type: Sequelize.STRING(255),
          allowNull: true,
      },
      route: {
          type: Sequelize.STRING(255),
          allowNull: true,
      },
      ip: {
          type: Sequelize.STRING(100),
          allowNull: true,
      },
      body: {
          type: Sequelize.JSON,
          allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return queryInterface.dropTable('request_logs');
  }
};
