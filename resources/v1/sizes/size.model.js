"use strict";
const Sequelize = require("sequelize");

module.exports = class SizeModel extends Sequelize.Model {
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
          defaultValue: null,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: new Date(),
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          onUpdate: "SET DEFAULT",
          defaultValue: new Date(),
        },
        deleted_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        modelName: "Size",
        tableName: "sizes",
        createdAt: "created_at",
        updatedAt: "updated_at",
        underscored: true,
        sequelize,
      }
    );
  }

  // static associate(models) {
  //   this.relationship = this.hasMany(models.Product, {
  //     as: "products",
  //     foreignKey: "category_id",
  //     onDelete: "CASCADE",
  //   });
  // }
};
