const _ = require('lodash');
const Joi = require('joi');
const DataHelpers = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelpers();

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const BannerResource = require('./banners.resources');
const _Banner = new BannerResource();

module.exports = class BannerValidation {

    async createOne(req, res, next) {
        console.log('BannerValidation@createOne');

        let schema = {
            caption: Joi.string().optional(),
            path: Joi.string().required(),
            service_id: Joi.string().required(),
        }

        let errors = await _DataHelper.joiValidation(req.body, schema);
        if (errors) {
            return response.badRequest('invalid request data', res, errors);
        }

        next();
    }


    async getAll(req, res, next) {
        console.log('BannerValidation@getAll');

        // verify page and size - set default if not provided
        let paginateData = await _DataHelper.getPageAndLimit(req.query);
        req.body.page = paginateData.page;
        req.body.limit = paginateData.limit;
        req.body.service_id = req?.query?.service_id;
        
        next();
    }

    async getOne(req, res, next) {
        console.log("BannerValidation@getOne")

        if (!req.params.id || req.params.id === '') {
            return response.badRequest('Banner id is required.', res, false);
        }
        
        next()
    }

    async updateOne(req, res, next) {
        console.log('BannerValidation@updateOne');

        if (!req.params.id || req.params.id === '') {
            return response.badRequest('id_required', res, false);
        }

        // make sure the banner exists
        let banner = await _Banner.getOne(req.params.id);
        if (!banner) {
            return response.badRequest('not_found', res, false);
        };

        let schema = {
            caption: Joi.string().optional(),
            path: Joi.string().required(),
            service_id: Joi.string().required(),
        }

        let errors = await _DataHelper.joiValidation(req.body, schema);
        if (errors) {
            return response.badRequest('invalid_request_data', res, errors);
        }

        next();
    }

    async deleteOne(req, res, next) {
        console.log('BannerValidation@deleteOne');

        if (!req.params.id || req.params.id === '') {
            return response.badRequest('Banner id is required', res, false);
        }

        // make sure the banner exists
        let banner = await _Banner.getOne(req.params.id);
        if (!banner) {
            return response.badRequest('Banner not found', res, false);
        };

        next();
    }

}