const express = require('express');
const routes = express.Router();

const RequestLogMiddleware = require('../../../middleware/v1/requestLog');
const reqLog = new RequestLogMiddleware();

const Authorize = require('../../../middleware/v1/authorize');
const auth = new Authorize();

const CategoriesValidation = require('./categories.validation');
const validate = new CategoriesValidation();

const CategoriesController = require('./categories.controller.js');
const category = new CategoriesController();

const UploadUtils = require('../../../utils/upload.utils');
const _upload = new UploadUtils('upload/excel/file')

/**
 * routes
 */

// routes.get('/trending', [auth.auth, validate.getTrendingCategories], category.getTrendingCategories);
routes.post('/', [validate.createOne], category.createOne);
routes.get('/managecategory', category.managecategory);
routes.get('/', [validate.getAll], category.getAll);
routes.put('/:id', [validate.updateOne], category.updateOne);
routes.delete('/:id', [validate.deleteOne], category.deleteOne);
// routes.get('/with-few-products', [auth.auth, validate.categoriesWithFewProducts], category.categoriesWithFewProducts); // This API is to fetch the categories with the few products to show in retail seller detail screen
// routes.get('/:id',[auth.auth, validate.getOne], category.getOne);
// routes.post('/import', [validate.import, _upload.uploadExcelFile().single('file')], category.import)

module.exports = routes;