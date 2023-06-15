const _ = require('lodash');
const Joi = require('joi');
const DataHelpers = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelpers();

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const CategoriesResource = require('./categories.resources');
const _Category = new CategoriesResource();


module.exports = class CategoriesValidation {

    async createOne(req, res, next) {
        console.log('CategoriesValidation@createOne');
        let schema = {
            name: Joi.string().required(),
            description: Joi.string().optional(),
            parent_id: Joi.any().optional()
       }

        let errors = await _DataHelper.joiValidation(req.body, schema);
        if(errors) {
            return response.badRequest('Invalid request data', res, errors);
        }

        if(req.body.parent_id && req.body.parent_id != ''){
            const category = await _Category.getByColumnNameAndValue('id', req.body.parent_id);
            if(!category){
                return response.badRequest('Invalid parent id', res, false);
            }
        }

        const slug = await _DataHelper.generateSlug(req.body.name);
        const categoryBySlug = await _Category.getByColumnNameAndValue('slug', slug);
        if(categoryBySlug){
            return response.badRequest('Category already exist with this name', res, false);
        }
        req.body.slug = slug;

        next();
    }

    async getAll(req, res, next) {
        console.log('CategoriesValidation@getAll');
        
        let paginateData = await _DataHelper.getPageAndLimit(req.query);
        req.body.page = paginateData.page;
        req.body.limit = paginateData.limit;
        req.body.category_id = req.query.category_id;
        next();
    }

    async getOne(req,res,next){
        console.log("CategoriesValidation@getOne")
        if (!req.params.id || req.params.id === '') {
            return response.badRequest('Category id is required.', res, false);
        }

        next()
    }

    async deleteOne(req,res,next){
        console.log("CategoriesValidation@deleteOne")
        if (!req.params.id || req.params.id === '') {
            return response.badRequest('Category id is required.', res, false);
        }

        next()
    }

    async updateOne(req,res,next){
        console.log("CategoriesValidation@updateOne")
        if (!req.params.id || req.params.id === '') {
            return response.badRequest('Category id is required.', res, false);
        }

        req.body.id=req.params.id

        let schema = {
            id:Joi.string().required(),
            name: Joi.string().required(),
            description: Joi.string().optional(),
            parent_id: Joi.any().optional()
       }

        let errors = await _DataHelper.joiValidation(req.body, schema);
        if(errors) {
            return response.badRequest('Invalid request data', res, errors);
        }

        if(req.body.parent_id && req.body.parent_id != ''){
            const category = await _Category.getByColumnNameAndValue('id', req.body.parent_id);
            if(!category){
                return response.badRequest('Invalid parent id', res, false);
            }
        }

        next()
    }

    // async categoriesWithFewProducts(req, res, next) {
    //     console.log('CategoryValidation@categoriesWithFewProducts');
    
    //     if (!req.query.category_ids || req.query.category_ids === '') {
    //         return response.badRequest('category id is required.', res, false);
    //     }

    //     if (!req.query.seller_id || req.query.seller_id === '') {
    //         return response.badRequest('seller id is required.', res, false);
    //     }

    //     req.body.category_ids = req.query.category_ids,
    //     req.body.seller_id = req.query.seller_id,
    //     req.body.product_limit = req.query.product_limit,

    //     next();
    // }

    // async import(req, res, next) {
    //     console.log("CategoryValidation@import");
        
        // if (!req.params.serviceId || req.params.serviceId === '') {
        //     return response.badRequest('Service id is required.', res, false);
        // }

    //     next()
    // }

}