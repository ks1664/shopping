const express = require('express');
const routes = express.Router();

const RequestLogMiddleware = require('../../../middleware/v1/requestLog');
const reqLog = new RequestLogMiddleware();

const Authorize = require('../../../middleware/v1/authorize');
const auth = new Authorize();

const CouponsValidation = require('./coupons.validation');
const validate = new CouponsValidation();

const CouponsController = require('./coupons.controller.js');
const coupon = new CouponsController();

/**
 * routes
 */



routes.get('/',[validate.getAll], coupon.getAll)
routes.post('/verify', [validate.verifyCoupon], coupon.verifyCoupon)


module.exports = routes;