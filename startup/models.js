'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../config/v1/mysql');

const CategoryModel = require('../resources/v1/category/category.model')
const SizeModel = require('../resources/v1/sizes/size.model')

const RequestLogModel = require('../resources/v1/common/requestLog.model');
const ProductModel = require('../resources/v1/products/product.model')
const BrandModel = require('../resources/v1/brands/brand.model')
const ProductAttributeModel = require('../resources/v1/product_attributes/product_attribute.model');
const AttributeModel = require('../resources/v1/attributes/attribute.model');
const AttributeValueModel = require('../resources/v1/attribute_values/attribute_value.model');
const ServiceModel = require('../resources/v1/services/service.model')
const ReviewModel = require('../resources/v1/reviews/review.model')
const ProductImageModel = require('../resources/v1/product_images/product_image.model')
const BannerModel = require('../resources/v1/banners/banner.model')
const BundleProductModel = require('../resources/v1/bundle_products/bundle_products.model')
const CouponModel = require('../resources/v1/coupons/coupon.model')
const SupplyModel = require('../resources/v1/supplies/supply.model');
const ManufactureModel = require("../resources/v1/manufactures/manufacture.model")
const SupplyManufactureModel = require("../resources/v1/supply_manufactures/supply_manufacture.model");


const models = {
    Category: CategoryModel.init(sequelize, Sequelize),
    Size: SizeModel.init(sequelize, Sequelize),

    RequestLog: RequestLogModel.init(sequelize, Sequelize),
    Product: ProductModel.init(sequelize, Sequelize),
    Brand: BrandModel.init(sequelize, Sequelize),
    ProductAttribute: ProductAttributeModel.init(sequelize, Sequelize),
    Attribute: AttributeModel.init(sequelize, Sequelize),
    AttributeValue: AttributeValueModel.init(sequelize, Sequelize),
    Service: ServiceModel.init(sequelize, Sequelize),
    Review : ReviewModel.init(sequelize, Sequelize),
    ProductImage : ProductImageModel.init(sequelize,Sequelize),
    Banner: BannerModel.init(sequelize, Sequelize),
    BundleProduct: BundleProductModel.init(sequelize, Sequelize),
    Coupon: CouponModel.init(sequelize, Sequelize),
    Supply: SupplyModel.init(sequelize, Sequelize),
    Manufacture: ManufactureModel.init(sequelize, Sequelize),
    SupplyManufacture: SupplyManufactureModel.init(sequelize, Sequelize)
}   

Object.values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(models));

const db = {
    models,
    sequelize,
}

module.exports = db;