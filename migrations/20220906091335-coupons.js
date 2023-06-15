'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return queryInterface.createTable('coupons', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      seller_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      service_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('percentage', 'flat'),
        allowNull: false,
        defaultValue: 'percentage'
      },
      method: {
        type: Sequelize.ENUM('coupon'),
        allowNull: false,
        defaultValue: 'coupon'
      },
      start_time: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      },
      end_time: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      },
      minimum_order_amount: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      discount_percentage: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      discount_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      max_discount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      min_discount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      max_total_usage: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
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
    return queryInterface.dropTable('coupons');
  }
};
