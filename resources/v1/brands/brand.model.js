'use strict';
const Sequelize = require('sequelize');

module.exports = class BrandModel extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
        {
          id: {
              type: DataTypes.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true,
          },
          service_id: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          name: {
              type: DataTypes.STRING,
              allowNull: false,
          },
          image: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
          },
          description: {
              type: DataTypes.TEXT,
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
            modelName: 'Brand',
            tableName: 'brands',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            underscored: true,
            sequelize,
        }
      )
    }

    static associate(models) {
      // this.relationship = this.belongsTo(models.Brand, {
      //     as: 'brands',
      //     foreignKey: 'id',
      //     onDelete: 'SET NULL',
      // })
    }

}