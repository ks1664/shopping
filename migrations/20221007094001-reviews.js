'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('reviews', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      order_id: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      flag_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null
      },
      flag: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'order',
        comment: "[{ product, driver, seller, order }]"
      },
      product_quality_rating: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      value_of_money_rating:{
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      images: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: null
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        onUpdate: 'SET DEFAULT',
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('reviews');
  }
};
