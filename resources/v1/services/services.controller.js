const _ = require('lodash');

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const DataHelper = require('../../../helpers/v1/data.helpers')
const _DataHelper = new DataHelper()

const ServicesResource = require('./services.resources');
const _Service = new ServicesResource();

module.exports = class ServicesController {

    async createOne(req,res){        
        console.log('ServicesController@createOne');

        let data = _.pick(req.body,['name', 'description', 'image', 'slug', 'type'])

        let result = await _Service.createOne(data);
        if (!result) {
            return response.exception('service not created.', res, false);
        }
        // await _ElasticSearch.createRecord(process.env.ELASTIC_GLOBAL_INDEX, {id:result.id,name:result.name,type:process.env.ELASTIC_SERVICE_INDEX})

        return response.created('service created successfully', res, result);
    }

    async getAll(req,res){
        console.log('ServicesController@getAll')

        let results = await _Service.getAll(req.body.page, req.body.limit, req.body.type);
        if (!results) {
            return response.notFound('no Services found', res, false);
        }

        return response.success('Services found', res, results);
    }
    
    async getOne(req, res) {
        console.log('ServicesController@getOne');

        let result = await _Service.getOneByColumnNameAndValue('id', req.params.id);
        if(!result) {
            return response.notFound('not_found', res, false);
        }

        return response.success('success', res, result);
    }

    

    async updateOne(req, res) {
        console.log('ServicesController@updateOne');

        let data = _.pick(req.body,['name', 'description', 'image', 'type'])

        let hasUpdated = await _Service.updateOne(req.params.id, data);
        if(!hasUpdated) {
            return response.exception('not_updated_successfully', res, false);
        }

        const result = await _Service.getOneByColumnNameAndValue('id', req.params.id);
        return response.success('success', res, result);
    }

    async deleteOne(req, res) {
        console.log('ServicesController@deleteOne');

        let hasDeleted = await _Service.deleteOne(req.params.id);
        if(!hasDeleted) {
            return response.exception('error deleting brands', res, false);
        }

        return response.success('Service deleted successfully!', res, hasDeleted);
    }


}   