'use strict';
const Sequelize = require('sequelize');

module.exports = class SupplyManufactureModel extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
        {
          id: {
              type: DataTypes.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true,
          },
          supply_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
          },
          manufacture_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'manufactures',
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
            modelName: 'SupplyManufacture',
            tableName: 'supply_manufactures',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            underscored: true,
            sequelize,
        }
      )
    }

    static associate(models) {
        this.relationship = this.belongsTo(models.Manufacture, {
            as: 'manufactures',
            foreignKey: 'manufacture_id',
            onDelete: 'CASCADE',
        })
      }
}