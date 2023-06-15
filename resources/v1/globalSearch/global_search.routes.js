const express = require('express');
const routes = express.Router();

const RequestLogMiddleware = require('../../../middleware/v1/requestLog');
const reqLog = new RequestLogMiddleware();

const Authorize = require('../../../middleware/v1/authorize');
const auth = new Authorize();

// const ReviewsValidation = require('./reviews.validation');
// const validate = new ReviewsValidation();

const GlobalSearchController = require('./global_search.controller');
const globalSearch = new GlobalSearchController();


/**
 * routes
 */

routes.get('/', globalSearch.getAllSearchByName)
routes.post('/create-seller', globalSearch.creatSellerInES)
routes.post('/list-create-seller', globalSearch.listCreatSellerInES)


module.exports = routes; 