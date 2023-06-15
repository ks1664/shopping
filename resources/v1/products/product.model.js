"use strict";
const Sequelize = require("sequelize");

module.exports = class ProductModel extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        category_id: {
          type: DataTypes.INTEGER,
          references: {
            model: "categories",
            key: "id",
          },
          onDelete: "SET NULL",
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        created_by: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: null,
        },
        image: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
          defaultValue: null,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: true,
          defaultValue: null,
        },
        offerprice: {
          type: DataTypes.FLOAT,
          allowNull: true,
          defaultValue: null,
        },
        sku: {
          type: DataTypes.STRING,
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
        modelName: "Product",
        tableName: "products",
        createdAt: "created_at",
        updatedAt: "updated_at",
        underscored: true,
        sequelize,
      }
    );
  }

  static associate(models) {
    this.relationship = this.belongsTo(models.Category, {
      as: "category",
      foreignKey: "category_id",
      onDelete: "SET NULL",
    });

    this.relationship = this.hasMany(models.Review, {
      as: "review",
      foreignKey: "product_id",
      onDelete: "CASCADE",
    });

    this.relationship = this.hasMany(models.ProductImage, {
      as: "product_images",
      foreignKey: "product_id",
      onDelete: "CASCADE",
    });
  }
};
