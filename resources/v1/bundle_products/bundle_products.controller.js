const _ = require('lodash');

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const BundleProductResource = require('./bundle_products.resources');
const _BundleProduct = new BundleProductResource();

module.exports = class BundleProductController {

    async createOne(req,res){
        
        console.log('BundleProductController@createOne');
        let data = _.pick(req.body,['product_id', 'qty','price'])
    
        let result = await _BundleProduct.createOne(data);
        if (!result) {
            return response.exception('Unable to create bundle product', res, false);
        }
      
        return response.created('Bundle product created successfully!', res, result);
    }

    async getAll(req, res) {
        console.log('BundleProductController@getAll');

        let data = _.pick(req.body, ['page', 'limit', 'product_id'])

        let result = await _BundleProduct.getAll(data.page, data.limit, data.product_id);
        if(!result) {
            return response.notFound('No product bundle found', res, false);
        }

        return response.success('Product bundle found', res, result);
    }
    async getOne(req, res) {
        console.log('BundleProductController@getOne');

        let result = await _BundleProduct.getOneByColumnNameAndValue('id', req.params.id);
        if(!result) {
            return response.notFound('No bundle product found', res, false);
        }

        return response.success('Bundle product found', res, result);
    }

}