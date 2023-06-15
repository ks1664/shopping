const _ = require('lodash');
const Joi = require('joi');
const DataHelpers = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelpers();

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const BrandResource = require('./brands.resources');
const _Brand = new BrandResource();

module.exports = class BrandsValidation {

    async createOne(req, res, next) {
        console.log('BrandsValidation@createOne');
        
        let schema = {
            name: Joi.string().required(),
            description: Joi.string().optional(),
            service_id: Joi.number().required()
        }

        let errors = await _DataHelper.joiValidation(req.body, schema);
        if(errors) {
            return response.badRequest('invalid request data', res, errors);
        }

        next();
    }

    async getAll(req, res, next) {
        console.log('BrandValidation@getAll');
        // verify page and size - set default if not provided
        let paginateData = await _DataHelper.getPageAndLimit(req.query);
        req.body.page = paginateData.page;
        req.body.limit = paginateData.limit;

        req.body.service_id = req.query.service_id;
        req.body.category_id = req.query.category_id;
        req.body.search = req.query.search;
        
        next();
    }

    async getOne(req,res,next){
        console.log("BrandValidation@getOne")

        if (!req.params.id || req.params.id === '') {
            return response.badRequest('Brand id is required.', res, false);
        }

        next()
    }


    async updateOne(req, res, next) {
        console.log('BrandsValidation@updateOne');

        if (!req.params.id || req.params.id === '') {
            return response.badRequest('id_required', res, false);
        }

        let brand = await _Brand.getByColumnNameAndValue('id', req.params.id);
        if(!brand) {
            return response.badRequest('Invalid request!', res, false);
        };

        let schema = {
            name: Joi.string().required(),
            description: Joi.string().optional(),
            service_id: Joi.number().required(),
        }

        let errors = await _DataHelper.joiValidation(req.body, schema);
        if(errors) {
            return response.badRequest('invalid_request_data', res, errors);
        }

        next();
    }

    async deleteOne(req, res, next) {
        console.log('BrandsValidation@deleteOne');

        if (!req.params.id || req.params.id === '') {
            return response.badRequest('Brand id is required', res, false);
        }

        let brand = await _Brand.getByColumnNameAndValue('id', req.params.id);
        if (!brand) {
            return response.badRequest('Brand not found', res, false);
        };
        
        next();
    }
    
}