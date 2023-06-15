'use strict';
const Sequelize = require('sequelize');

module.exports = class AttributeValueModel extends Sequelize.Model {
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
          name: {
              type: DataTypes.STRING,
              allowNull: false,
          },
          description: {
              type: DataTypes.TEXT,
              allowNull: true,
              defaultValue: null
          },
          image: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
          },
          price: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0
          },
          seller_price: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0
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
            modelName: 'AttributeValue',
            tableName: 'attribute_values',
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