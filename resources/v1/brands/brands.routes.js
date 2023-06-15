const express = require('express');
const routes = express.Router();

const RequestLogMiddleware = require('../../../middleware/v1/requestLog');
const reqLog = new RequestLogMiddleware();

const Authorize = require('../../../middleware/v1/authorize');
const auth = new Authorize();

const BrandValidation = require('./brands.validation');
const validate = new BrandValidation();

const ProductsController = require('./brands.controller');
const brand = new ProductsController();


/**
 * routes
 */

// B2B APIs
routes.get('/b2b', [validate.getAll], brand.getAll);

 routes.post('/', [auth.auth, validate.createOne], brand.createOne);
 routes.get('/', [auth.auth, validate.getAll], brand.getAll);
 routes.get('/:id', [auth.auth, validate.getOne], brand.getOne);
 routes.put('/:id', [auth.auth, validate.updateOne], brand.updateOne);
 routes.delete('/:id', [auth.auth, validate.deleteOne], brand.deleteOne);

 module.exports = routes;
