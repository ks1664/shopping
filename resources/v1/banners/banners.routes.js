const express = require('express');
const routes = express.Router();

const RequestLogMiddleware = require('../../../middleware/v1/requestLog');
const reqLog = new RequestLogMiddleware();

const Authorize = require('../../../middleware/v1/authorize');
const auth = new Authorize();

const BannerdValidation = require('./banners.validation');
const validate = new BannerdValidation();

const bannerController = require('./banners.controller');
const banner = new bannerController();


/**
 * routes
 */
routes.get('/b2b/', [validate.getAll], banner.getAll)

routes.post('/', [auth.auth, validate.createOne], banner.createOne)
routes.get('/', [auth.auth, validate.getAll], banner.getAll)
routes.get('/:id', [auth.auth, validate.getOne], banner.getOne)
routes.put('/:id', [auth.auth, validate.updateOne, reqLog.logRequest],banner.updateOne);
routes.delete('/:id', [auth.auth,validate.deleteOne], banner.deleteOne);

module.exports = routes;
