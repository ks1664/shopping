const express = require('express');
const routes = express.Router();

const RequestLogMiddleware = require('../../../middleware/v1/requestLog');
const reqLog = new RequestLogMiddleware();

const Authorize = require('../../../middleware/v1/authorize');
const auth = new Authorize();

const supplyValidation = require('./supplies.validation');
const validate = new supplyValidation();

const SupplyController = require('./supplies.controller');
const supply = new SupplyController();

/**
 * routes
 */

//B2B APIs
routes.get('/seller-info/b2b/:sellerId', [validate.getSellerInfoWithProductsAndOffers], supply.getSellerInfoWithProductsAndOffers)

routes.get('/products-availability-status', [auth.auth, validate.productsAvailabilityStatus], supply.productsAvailabilityStatus) // as 3rd party API
routes.get('/seller-ids', [validate.getSellerIds], supply.getSellerIds)  // as 3rd party API

routes.get('/seller-info/:sellerId', [auth.auth, validate.getSellerInfoWithProductsAndOffers], supply.getSellerInfoWithProductsAndOffers)

module.exports = routes;