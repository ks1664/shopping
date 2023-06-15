'use strict';
const Sequelize = require('sequelize');

module.exports = class SupplyModel extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        seller_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        product_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'products',
            key: 'id',
          },
          onDelete: 'CASCADE'
        },
        total_quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        sold_quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        rest_quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        min_quantity: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
          defaultValue: 0
        },
        seller_price: {
          type: DataTypes.FLOAT,
          allowNull: false,
          defaultValue: 0
        },
        status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
          comment: "0 = In-active, 1 = Active"
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
        modelName: 'Supply',
        tableName: 'supplies',
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