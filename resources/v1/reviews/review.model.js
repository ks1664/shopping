'use strict';
const Sequelize = require('sequelize');

module.exports = class ReviewModel extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
          {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
              type: DataTypes.STRING,
              allowNull: false
            },
            order_id: {
              type: DataTypes.STRING,
              allowNull: true,
              defaultValue: null
            },
            flag_id: {
              type: DataTypes.STRING,
              allowNull: false
            },
            rating: {
              type: DataTypes.INTEGER,
              allowNull: false
            },
            comment: {
              type: DataTypes.TEXT,
              allowNull: true,
              defaultValue: null
            },
            flag: {
              type: DataTypes.STRING,
              allowNull: false,
              defaultValue: 'order',
              comment: "[{ product, driver, seller, order }]"
            },
            product_quality_rating: {
              type: DataTypes.INTEGER ,
              allowNull: true,
              defaultValue: null
            },
            value_of_money_rating:{
              type: DataTypes.INTEGER,
              allowNull: true,
              defaultValue: null
            },
            images: {
              type: DataTypes.JSON,
              allowNull: true,
              defaultValue: null
            },
            created_at: {
              type: DataTypes.DATE,
              allowNull: false,
              defaultValue: Sequelize.NOW,
            },
            updated_at: {
              type: DataTypes.DATE,
              allowNull: false,
              onUpdate: 'SET DEFAULT',
              defaultValue: Sequelize.NOW,
            },
            deleted_at: {
              type: DataTypes.DATE,
              allowNull: true,
            }
          },
          {
              modelName: 'Review',
              tableName: 'reviews',
              createdAt: 'created_at',
              updatedAt: 'updated_at',
              underscored: true,
              sequelize,
          }
        )
    }

    

}