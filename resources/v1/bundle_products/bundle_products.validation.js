const _ = require('lodash');

const Joi = require('joi');

const DataHelpers = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelpers();

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const BundleProductResource = require('./bundle_products.resources');
const _BundleProduct = new BundleProductResource();

module.exports = class BundleProductValidation {

    async createOne(req, res, next) {
        console.log('BundleProductValidation@createOne');
        
        let schema = {
            product_id: Joi.number().integer().required(),
            qty: Joi.number().integer().required(),
            price: Joi.number().required()
        }

        let errors = await _DataHelper.joiValidation(req.body, schema);
        if(errors) {
            return response.badRequest('invalid request data', res, errors);
        }

        const bundleProduct = await _BundleProduct.getOneByColumnNameAndValue('product_id', req.body.product_id);
        if(bundleProduct && bundleProduct.qty == req.body.qty){
            return response.badRequest('Bundle already exist with the same product and qty.', res, errors);
        }

        next();
    }
    
    async getAll(req, res, next) {
        console.log('BundleProductValidation@getAll');
        
        // verify page and size - set default if not provided
        let paginateData = await _DataHelper.getPageAndLimit(req.query);
        req.body.page = paginateData.page;
        req.body.limit = paginateData.limit;
        req.body.product_id = req.query.product_id;
        
        next();
    }
    async getOne(req, res, next) {
        console.log('BundleProductValidation@getOne');
        
        if (!req.params.id || req.params.id === '') {
            return response.badRequest('Bundle id is required.', res, false);
        }

        next();
    }


}