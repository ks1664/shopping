const _ = require('lodash');

const Joi = require('joi').extend(require('@joi/date'));

const DataHelpers = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelpers();

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

module.exports = class SuppliesValidation {
 

    async getSellerInfoWithProductsAndOffers(req,res,next){
        console.log("SupplyValidation@getSellerInfoWithProductsAndOffers")
        // verify page and size - set default if not provided
        let paginateData = await _DataHelper.getPageAndLimit(req.query);
        req.body.page = paginateData.page;
        req.body.limit = paginateData.limit;

        if (!req.params.sellerId || req.params.sellerId === '') {
            return response.badRequest('Seller id is required!', res, false);
        }

        if (!req.query.lat || req.query.lat === '' || !req.query.long || req.query.long === '') {
            return response.badRequest('Customers lat & long is required!', res, false);
        }

        next()
    }

    async productsAvailabilityStatus(req, res, next) {
        console.log('SuppliesValidation@productsAvailabilityStatus');

        if (!req.query.seller_id || req.query.seller_id === '') {
            return response.badRequest('Seller id is required!', res, false);
        }

        if (!req.query.product_ids || req.query.product_ids === '') {
            return response.badRequest('Product ids is required!', res, false);
        }

        next();
    }

    async getSellerIds (req, res, next) {
        console.log('SuppliesValidation@getSellerIds');

        req.body.category_id = req.query.category_id;

        next();
    }

}