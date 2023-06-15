'use strict';
const Sequelize = require('sequelize');

module.exports = class BannerModel extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
        {
          id: {
              type: DataTypes.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true,
          },
          caption: {
              type: DataTypes.STRING,
              allowNull: false,
          },
          path: {
              type: DataTypes.TEXT,
              allowNull: true,
              defaultValue: null
          },
          service_id:{
            type: DataTypes.INTEGER,
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
            modelName: 'Banner',
            tableName: 'banners',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            underscored: true,
            sequelize,
        }
      )
    }
}