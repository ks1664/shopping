'use strict';
const Sequelize = require('sequelize');

module.exports = class ProductImageModel extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
        {
          id: {
              type: DataTypes.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true,
          },
          url: {
            type: DataTypes.TEXT,
            allowNull: false
          },
          product_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'products',
              key: 'id',
            },
            onDelete: 'SET NULL'
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
            modelName: 'ProductImage',
            tableName: 'product_images',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            underscored: true,
            sequelize,
        }
      )
    }

    static associate(models) {
      // this.relationship = this.belongsTo(models.Brands, {
      //     as: 'brands',
      //     foreignKey: 'id',
      //     onDelete: 'SET NULL',
      // })
    }

}