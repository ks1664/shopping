const express = require('express');
const routes = express.Router();

const RequestLogMiddleware = require('../../../middleware/v1/requestLog');
const reqLog = new RequestLogMiddleware();

const Authorize = require('../../../middleware/v1/authorize');
const auth = new Authorize();

const BundleProductsValidation = require('./bundle_products.validation');
const validate = new BundleProductsValidation();

const BundleProductsController = require('./bundle_products.controller');
const bundleProduct = new BundleProductsController();

/**
 * routes
 */

routes.post('/',[auth.auth, validate.createOne], bundleProduct.createOne);
routes.get('/',[auth.auth, validate.getAll], bundleProduct.getAll);
routes.get('/:id', [auth.auth, validate.getOne], bundleProduct.getOne);

module.exports = routes;