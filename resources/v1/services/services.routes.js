const express = require('express');
const routes = express.Router();

const RequestLogMiddleware = require('../../../middleware/v1/requestLog');
const reqLog = new RequestLogMiddleware();

const Authorize = require('../../../middleware/v1/authorize');
const auth = new Authorize();

const ServicesValidation = require('./services.validation');
const validate = new ServicesValidation();

const ServicesController = require('./services.controller.js');
const service = new ServicesController();

/**
 * routes
 */

// B2B APIs
routes.get('/b2b', [validate.getAll], service.getAll);


routes.post('/', [auth.auth, validate.createOne], service.createOne);
routes.get('/', [auth.auth, validate.getAll], service.getAll);
routes.get('/:id', [auth.auth, validate.getOne], service.getOne);
routes.put('/:id', [auth.auth, validate.updateOne], service.updateOne);
routes.delete('/:id', [auth.auth, validate.deleteOne], service.deleteOne);


module.exports = routes;