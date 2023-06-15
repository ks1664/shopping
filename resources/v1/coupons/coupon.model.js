'use strict';
const Sequelize = require('sequelize');

module.exports = class CouponModel extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
        {
          id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          code: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          seller_id: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          service_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          Image: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          type: {
            type: DataTypes.ENUM('percentage', 'flat'),
            allowNull: false,
            defaultValue: 'percentage'
          },
          method: {
            type: DataTypes.ENUM('coupon'),
            allowNull: false,
            defaultValue: 'coupon'
          },
          start_time: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
          },
          end_time: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
          },
          minimum_order_amount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
          },
          discount_percentage: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
          },
          discount_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
          },
          max_discount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
          },
          min_discount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
          },
          max_total_usage: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
          },
          description: {
            type: DataTypes.TEXT,
            allowNull: true
          },
          created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date(),
          },
          updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            onUpdate: 'SET DEFAULT',
            defaultValue: new Date(),
          },
          deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
          }
        },
        {
            modelName: 'Coupon',
            tableName: 'coupons',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            underscored: true,
            sequelize,
        }
      )
    }

    static associate(models) {
     
    }

}