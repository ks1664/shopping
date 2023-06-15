const _ = require('lodash');

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const DataHelper = require('../../../helpers/v1/data.helpers')
const _DataHelper = new DataHelper()

const BrandsResource = require('./brands.resources');
const _Brand = new BrandsResource();

const CategoryResource = require('../category/categories.resources');
const _Category = new CategoryResource();

const ElasticSearchServices = require('./../../../services/elasticsearch.service')
const _ElasticSearch = new ElasticSearchServices()

module.exports = class BrandsController {

    async createOne(req,res){
        console.log('BrandsController@createOne');

        let data = _.pick(req.body,['name', 'description', 'service_id'])
        
        let result = await _Brand.createOne(data);
        if (!result) {
            return response.exception('Brand not created successfully', res, false);
        }

        return response.created('Brand created successfully', res, result);
    }

    async getAll(req,res){
        console.log('BrandsController@getAll')

        let data = _.pick(req.body,['page', 'limit', 'service_id', 'category_id', 'search'])

        const serviceIds = data.service_id && data.service_id != '' ? [data.service_id] : [];
        if(data.category_id && data.category_id != ''){
            const category = await _Category.getByColumnNameAndValue('id', data.category_id);
            if(category && category.service_id){
                serviceIds.push(category.service_id);
            }
        }

        data.service_ids = serviceIds;
        let results = await _Brand.getAll(data);
        if (!results) {
            return response.notFound('no Brands found', res, false);
        }

        return response.success('Brands found', res, results);
    }

    async getOne(req, res) {
        console.log('BrandController@getOne');

        let result = await _Brand.getByColumnNameAndValue('id', req.params.id);
        if(!result) {
            return response.notFound('not_found', res, false);
        }

        return response.success('success', res, result);
    }

    async updateOne(req, res) {
        console.log('BrandController@updateOne');

        let data = _.pick(req.body,['name', 'description', 'service_id'])

        let hasUpdated = await _Brand.updateOne(req.params.id, data);
        if(!hasUpdated) {
            return response.exception('not_updated_successfully', res, false);
        }

        const result = await _Brand.getByColumnNameAndValue('id', req.params.id);
        return response.success('success', res, result);
    }

    async deleteOne(req, res) {
        console.log('BrandsController@deleteOne');

        let hasDeleted = await _Brand.deleteOne(req.params.id);
        if(!hasDeleted) {
            return response.exception('error deleting brands', res, false);
        }

        return response.success('Brand deleted successfully!', res, hasDeleted);
    }

}