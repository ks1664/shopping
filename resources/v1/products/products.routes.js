const express = require('express');
const routes = express.Router();

const RequestLogMiddleware = require('../../../middleware/v1/requestLog');
const reqLog = new RequestLogMiddleware();

const Authorize = require('../../../middleware/v1/authorize');
const auth = new Authorize();

const ProductsValidation = require('./products.validation');
const validate = new ProductsValidation();

const ProductsController = require('./products.controller.js');
const product = new ProductsController();

const UploadUtils = require('../../../utils/upload.utils');
const _upload = new UploadUtils('upload/excel/file')


/**
 * routes
 */

//B2B APIs
routes.get('/b2b', [validate.getAll], product.getAll)
routes.get('/b2b/:id', [validate.getOne], product.getOne);
routes.get('/b2b/trending', [validate.getTrendingProducts], product.getTrendingProducts);

routes.get('/dashboard', [auth.auth, validate.getDashboardData ], product.getDashboardData);
routes.get('/to-reviews', [auth.auth, validate.getProductsToReviews], product.getProductsToReviews)
routes.get('/', [auth.auth, validate.getAll], product.getAll);
routes.get('/top-selling/:sellerId', [auth.auth, validate.getTopSellingProducts], product.getTopSellingProducts);
routes.get('/trending', [auth.auth, validate.getTrendingProducts], product.getTrendingProducts);
routes.post('/import', [validate.import, _upload.uploadExcelFile().single('file')], product.import);

// delete products categories and supplies 
routes.delete('/inventory', [validate.deleteInventory], product.deleteInventory);

routes.get('/:id/:sku?', [auth.auth, validate.getOne], product.getOne);

module.exports = routes;