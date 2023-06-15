const express = require('express');
const routes = express.Router();

const RequestLogMiddleware = require('../../../middleware/v1/requestLog');
const reqLog = new RequestLogMiddleware();

const Authorize = require('../../../middleware/v1/authorize');
const auth = new Authorize();

const SizesValidation = require('./sizes.validation');
const validate = new SizesValidation();

const SizesController = require('./sizes.controller.js');
const size = new SizesController();

/**
 * routes
 */

routes.get('/', [validate.getAll], size.getAll);

module.exports = routes;