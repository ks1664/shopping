'use strict';
const Sequelize = require('sequelize');

module.exports = class BundleProductModel extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
        {
          id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          product_id: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
          },
          qty: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
          },
          price: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
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
            modelName: 'BundleProduct',
            tableName: 'bundle_products',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            underscored: true,
            sequelize,
        }
      )
    }

    static associate(models) {
      this.relationship = this.belongsTo(models.Product, {
          as: 'products',
          foreignKey: 'product_id',
          onDelete: 'CASCADE',
      })
    }
}