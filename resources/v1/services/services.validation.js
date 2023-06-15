const _ = require('lodash');
const Joi = require('joi');
const DataHelpers = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelpers();

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const ServicesResource = require('./services.resources');
const _Service = new ServicesResource();

module.exports = class ServicesValidation {

    async createOne(req, res, next) {
        console.log('ServicesValidation@createOne');
        
        let schema = {
            name: Joi.string().required(),
            description: Joi.string().optional(),
            image: Joi.string().uri().required(),
            type: Joi.string().valid('product','service').required()
        }

        let errors = await _DataHelper.joiValidation(req.body, schema);
        if(errors) {
            return response.badRequest('invalid request data', res, errors);
        }

        let isServiceExist = await _Service.isServiceExist('name', req.body.name);
        if(isServiceExist){
            return response.badRequest('Service already exist with this name', res, false);
        }

        const slug = await _DataHelper.generateSlug(req.body.name);
        isServiceExist = await _Service.isServiceExist('slug', slug);
        if(isServiceExist){
            return response.badRequest('Service already exist with this name', res, false);
        }

        req.body.slug = slug;

        next();
    }

    async getAll(req, res, next) {
        console.log('ServicesValidation@getAll');

        if(req.query.type && !['product', 'service'].includes(req.query.type.trim())){
            return response.badRequest("In-valid type! Type may be either 'product' or 'service'", res, false);
        }

        // verify page and size - set default if not provided
        let paginateData = await _DataHelper.getPageAndLimit(req.query);
        req.body.page = paginateData.page;
        req.body.limit = paginateData.limit;

        req.body.type = req.query.type;
        
        next();
    }

    async getOne(req,res,next){
        console.log("ServicesValidation@getOne")

        if (!req.params.id || req.params.id === '') {
            return response.badRequest('Service id is required.', res, false);
        }

        next()
    }


    async updateOne(req, res, next) {
        console.log('ServicesValidation@updateOne');

        if (!req.params.id || req.params.id === '') {
            return response.badRequest('id_required', res, false);
        }

        let service = await _Service.getOneByColumnNameAndValue('id', req.params.id);
        if(!service) {
            return response.badRequest('Service not found!', res, false);
        };

        let schema = {
            name: Joi.string().required(),
            description: Joi.string().optional(),
            image: Joi.string().uri().required(),
            type: Joi.string().valid('product','service').required()
        }

        let errors = await _DataHelper.joiValidation(req.body, schema);
        if(errors) {
            return response.badRequest('invalid_request_data', res, errors);
        }

        // const slug = await _DataHelper.generateSlug(req.body.name);
        // isServiceExist = await _Service.isServiceExist('slug', slug);
        // if(isServiceExist && service.slug != slug){
        //     return response.badRequest('Service already exist with this name', res, false);
        // }
        
        // req.body.slug = slug;
        
        next();
    }

    async deleteOne(req, res, next) {
        console.log('ServicesValidation@deleteOne');

        if (!req.params.id || req.params.id === '') {
            return response.badRequest('service id is required', res, false);
        }

        let service = await _Service.getOneByColumnNameAndValue('id', req.params.id);
        if (!service) {
            return response.badRequest('Service not found', res, false);
        };
        
        next();
    }

}