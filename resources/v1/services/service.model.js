'use strict';
const Sequelize = require('sequelize');

module.exports = class ServiceModel extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
          {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            slug: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            type: {
              type: DataTypes.ENUM('product', 'service'),
              allowNull: false,
              defaultValue: 'product'
            },
            description: {
              type: DataTypes.TEXT,
              allowNull: true,
              defaultValue: null
            },
            image: {
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
              modelName: 'Service',
              tableName: 'services',
              createdAt: 'created_at',
              updatedAt: 'updated_at',
              underscored: true,
              sequelize,
          }
        )
    }

    static associate(models) {
      // this.relationship = this.belongsTo(models.Brand, {
      //     as: 'brand',
      //     foreignKey: 'id',
      //     onDelete: 'SET NULL',
      // })
      
    }

}