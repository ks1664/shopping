const express = require('express');
const routes = express.Router();

const RequestLogMiddleware = require('../../../middleware/v1/requestLog');
const reqLog = new RequestLogMiddleware();

const Authorize = require('../../../middleware/v1/authorize');
const auth = new Authorize();

const ReviewsValidation = require('./reviews.validation');
const validate = new ReviewsValidation();

const ReviewsController = require('./reviews.controller.js');
const review = new ReviewsController();

/**
 * routes
 */

routes.post('/', [auth.auth,validate.createOne], review.createOne);
routes.get('/user/order-ids', [auth.auth, validate.getOrderIdsByUser], review.getOrderIdsByUser)  // as 3rd party API

// routes.get('/', [auth.auth,validate.getAll], review.getAll);


module.exports = routes; 