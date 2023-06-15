const _ = require('lodash');
const Joi = require('joi');
const DataHelpers = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelpers();

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const ProductsResource = require('./products.resources');
const _Product = new ProductsResource();


module.exports = class ProductsValidation {

    async import(req, res, next) {
        console.log("CategoryValidation@import");
        
        // if (!req.params.serviceId || req.params.serviceId === '') {
        //     return response.badRequest('Service id is required.', res, false);
        // }
        next()
    }

    async getAll(req, res, next) {
        console.log('ProductsValidation@getAll');
        // verify page and size - set default if not provided
        let paginateData = await _DataHelper.getPageAndLimit(req.query);
        req.body.page = paginateData.page;
        req.body.limit = paginateData.limit;

        req.body.search = req.query.search;
        req.body.seller_id = req.query.seller_id;
        req.body.service_id = req.query.service_id;
        req.body.service_type = req.query.service_type;
        req.body.brand_id = req.query.brand_id;
        req.body.category_ids = req.query.category_ids;
        req.body.sub_category_ids = req.query.sub_category_ids;
        req.body.product_ids = req.query.product_ids;

        next();
    }

    async getTopSellingProducts(req, res, next) {
        console.log('OrderDetailsValidation@getTopSellingProducts');
        // verify page and size - set default if not provided
        let paginateData = await _DataHelper.getPageAndLimit(req.query);
        req.body.page = paginateData.page;
        req.body.limit = paginateData.limit;

        if (!req.params.sellerId || req.params.sellerId === '') {
            return response.badRequest('SellerId is required.', res, false);
        }

        req.body.seller_id = req.params.sellerId

        next();
    }

    async getTrendingProducts(req, res, next) {
        console.log('CategoryValidation@getTrendingProducts');
        
        let paginateData = await _DataHelper.getPageAndLimit(req.query);
        req.body.page = paginateData.page;
        req.body.limit = paginateData.limit;
        
        req.body.service_id = req.query.service_id,
        req.body.service_type = req.query.service_type,
        req.body.brand_id = req.query.brand_id,
        req.body.seller_id = req.query.seller_id                                      

        next();
    }                            
                                                                                           
    async getOne(req, res, next) {
        console.log("ProductsValidation@getOne")
        if (!req.params.id || req.params.id === '') {
            return response.badRequest('Product id is required.', res, false);
        }
        
        next()
    }

    async getDashboardData(req, res, next) {
        console.log('DashboardsValidation@getDashboardData');

        req.body.coupons_limit = req.query.coupons_limit ? Number(req.query.coupons_limit) : 5;
        req.body.trending_sellers_limit = req.query.trending_sellers_limit ? Number(req.query.trending_sellers_limit) : 5;

        next();
    }


    async deleteInventory(req, res, next) {
        console.log('ProductsValidation@deleteInventory');
        next();
    }

    async getProductsToReviews(req, res, next) {
        console.log('OrderDetailsValidation@getProductsToReviews');

        let paginateData = await _DataHelper.getPageAndLimit(req.query);

        req.body.page = paginateData.page;
        req.body.limit = paginateData.limit;
        req.body.flag = req.query.flag;

        next();
    }

}