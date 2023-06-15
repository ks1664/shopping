const _ = require('lodash');

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const DataHelper = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelper();

const CouponsResource = require('./coupons.resources');
const _Coupon = new CouponsResource();

module.exports = class CouponsController {

    async getAll(req, res) {
        console.log('CouponsController@getAll')

        const data = _.pick(req.body, ['page', 'limit', 'seller_id', 'service_id']);

        const filterData = {
            sellerId: data.seller_id,
            serviceId: data.service_id
        };

        let results = await _Coupon.getAll(data.page, data.limit, filterData);
        if (!results) {
            return response.notFound('Coupons not found!', res, false);
        }

        return response.success('successfully found', res, results);
    }

    async verifyCoupon(req, res) {
        console.log('CouponsValidation@verifyCoupon');

        let coupon = req.body.coupon;
        
        let todayDateTime = await _DataHelper.getCurrentDateAndTime();
        let startDateTime = await _DataHelper.getFormatGivenDateAndTime(coupon.start_time);
        let endDateTime = await _DataHelper.getFormatGivenDateAndTime(coupon.end_time);

        if (startDateTime >= todayDateTime || endDateTime <= todayDateTime) {
            return response.badRequest('Coupon has been expired!', res, false);
        }

        return response.success('Coupon verified successfully!', res, coupon);

    }
    
}