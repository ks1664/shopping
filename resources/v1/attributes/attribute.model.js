'use strict';
const Sequelize = require('sequelize');

module.exports = class AttributeModel extends Sequelize.Model {
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
          description: {
              type: DataTypes.TEXT,
              allowNull: true,
              defaultValue: null
          },
          required_value_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
            modelName: 'Attribute',
            tableName: 'attributes',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            underscored: true,
            sequelize,
        }
      )
    }

    static associate(models) {
      this.relationship = this.hasMany(models.AttributeValue, {
          as: 'attribute_values',
          foreignKey: 'attribute_id',
          onDelete: 'CASCADE',
      })
    }

}