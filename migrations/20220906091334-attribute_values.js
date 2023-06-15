'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return queryInterface.createTable('attribute_values', {
      id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
      },
      attribute_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'attributes',
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      name: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      description: {
          type: Sequelize.TEXT,
          allowNull: true,
          defaultValue: null
      },
      image: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0
      },
      seller_price: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0
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

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('attribute_values');
  }
};
