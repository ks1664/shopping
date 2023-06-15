const _ = require('lodash');

const Joi = require('joi').extend(require('@joi/date'));

const DataHelpers = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelpers();

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const CouponsResource = require('./coupons.resources');
const _Coupon = new CouponsResource();

module.exports = class CouponsValidation {

    async getAll(req, res, next) {
        console.log('CouponsValidation@getAll');
        // verify page and size - set default if not provided
        let paginateData = await _DataHelper.getPageAndLimit(req.query);

        req.body.page = paginateData.page;
        req.body.limit = paginateData.limit;
        req.body.seller_id = req.query.seller_id;
        req.body.service_id = req.query.service_id;
        next();
    }

    async verifyCoupon(req, res, next) {
        console.log('CouponsValidation@verifyCoupon');

        let schema = {
            code: Joi.string().required(),
            seller_id: Joi.string().optional(),
            service_id: Joi.number().optional(),
            order_amount: Joi.number().optional()
        }

        let errors = await _DataHelper.joiValidation(req.body, schema);
        if(errors) {
            return response.badRequest('Invalid request data', res, errors);
        }

        let coupon = await _Coupon.getOne(req.body.code)
        if (!coupon) {
            return response.badRequest('invalid coupon code!', res, false);
        }

        if (req.body.seller_id && coupon.seller_id && coupon.seller_id !== req.body.seller_id) {
            return response.badRequest('Coupon is not valid for this seller!', res, false);
        }

        if (req.body.service_id && coupon.service_id && coupon.service_id !== Number(req.body.service_id)) {
            return response.badRequest('Coupon is not valid for this service!', res, false);
        }

        if (req.body.order_amount && coupon.minimum_order_amount && coupon.minimum_order_amount > req.body.order_amount) {
            return response.badRequest('This coupon is applicable on minimum ' + coupon.minimum_order_amount + ' order amount', res, false);
        }

        req.body.coupon = coupon;

        next();
    }

}