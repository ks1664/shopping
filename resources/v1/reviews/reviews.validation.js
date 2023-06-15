const _ = require('lodash');
const Joi = require('joi');
const DataHelpers = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelpers();

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const ReviewsResource = require('./reviews.resources');
const _Review = new ReviewsResource();


module.exports = class ReviewsValidation {

    async createOne(req, res, next) {
        console.log('ReviewsValidation@createOne');
        
        let schema = {
            order_id: Joi.string().required(),
            seller_id: Joi.string().optional(),
            driver_id: Joi.string().optional(),
            product_id: Joi.string().optional(),
            // flag_id: Joi.string().required(),
            // flag: Joi.string().valid('product', 'driver', 'seller', 'order').required(),
            rating : Joi.number().less(6).integer().required(),
            comment: Joi.string().optional(),
            product_quality_rating: Joi.number().less(6).integer().optional(),
            value_of_money_rating: Joi.number().less(6).integer().optional(),
            images: Joi.array().min(1).items(
                Joi.object().keys({
                    document: Joi.string().uri().required()
                })
            )    
        };

        let errors = await _DataHelper.joiValidation(req.body, schema);
        if(errors) {
            return response.badRequest('invalid request data', res, errors);
        }

        next();
    }

    async getOrderIdsByUser (req, res, next) {
        console.log('SuppliesValidation@getOrderIdsByUser');
        next();
    }

    // async getAll(req, res, next) {
    //     console.log('ReviewsValidation@getAll');
    //     // verify page and size - set default if not provided
    //     let paginateData = await _DataHelper.getPageAndLimit(req.query);
    //     req.body.page = paginateData.page;
    //     req.body.limit = paginateData.limit;

    //     if (!req.query.is_past || req.query.is_past === '' ) {
    //         return response.badRequest('is_past is required.', res, false);
    //     }
    //     if (!req.query.flag || req.query.flag === '' ) {
    //         return response.badRequest('flag is required.', res, false);
    //     }
    //     next();
    // }


}