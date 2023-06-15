const _ = require('lodash');

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const DataHelper = require('../../../helpers/v1/data.helpers')
const _DataHelper = new DataHelper()

const BannerResource = require('./banners.resources');
const _Banner = new BannerResource();

module.exports = class BannersController {

    async createOne(req,res){
        console.log('BannersController@createOne');

        let data = _.pick(req.body,['caption','path','service_id'])
        
        let result = await _Banner.createOne(data);
        if (!result) {
            return response.exception('Banner not created successfully', res, false);
        }

        return response.created('Banner created successfully', res, result);
    }


    async getAll(req,res){
        console.log('BannersController@getAll')

        let data = _.pick(req.body,['service_id','page','limit']);
        
        let results = await _Banner.getAll(data);
        if (!results) {
            return response.notFound('no Banner found', res, false);
        }

        return response.success('Banners found', res, results);
    }

    async getOne(req, res) {
        console.log('BannersController@getOne');

        let id = req.params.id;

        let result = await _Banner.getOne(id);
        if(!result) {
            return response.notFound('not_found', res, false);
        }
        
        return response.success('success', res, result);
    }

    async updateOne(req, res) {
        console.log('BannersController@updateOne');

        let data = _.pick(req.body,['caption','path','service_id'])

        let isBannerUpdated = await _Banner.updateOne(req.params.id, data);
        if(!isBannerUpdated) {
            return response.exception('not_updated_successfully', res, false);
        }

        // get the updated banner details
        const result = await _Banner.getOne(req.params.id);

        return response.success('success', res, result);
    }

    async deleteOne(req, res) {
        console.log('BannersController@deleteOne');

        let deleteBanner = await _Banner.deleteOne(req.params.id);
        if(!deleteBanner) {
            return response.exception('error deleting banner', res, false);
        }

        return response.success('successfully deleted banner', res, deleteBanner);
    }


}