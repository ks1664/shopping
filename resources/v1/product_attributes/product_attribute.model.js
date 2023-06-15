'use strict';
const Sequelize = require('sequelize');

module.exports = class ProductAttributeModel extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        attribute_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'attributes',
            key: 'id',
          },
          onDelete: 'SET NULL'
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
        modelName: 'ProductAttribute',
        tableName: 'product_attributes',
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
    this.relationship = this.belongsTo(models.Attribute, {
      as: 'attributes',
      foreignKey: 'attribute_id',
      onDelete: 'CASCADE',
    })

  }

}