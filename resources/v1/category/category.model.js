"use strict";
const Sequelize = require("sequelize");

module.exports = class CategoryModel extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        parent_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: null,
          references: {
            model: "categories",
            key: "id",
          },
          onDelete: "SET NULL",
        },
        image: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: null,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        category_uuid: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: null,
        },
        slug: {
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
        modelName: "Category",
        tableName: "categories",
        createdAt: "created_at",
        updatedAt: "updated_at",
        underscored: true,
        sequelize,
      }
    );
  }

  static associate(models) {
    this.relationship = this.hasMany(models.Product, {
      as: "products",
      foreignKey: "category_id",
      onDelete: "CASCADE",
    });

    this.relationship = this.belongsTo(models.Category, {
      as: "categories",
      foreignKey: "parent_id",
      onDelete: "CASCADE",
    });
  }
};
