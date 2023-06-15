'use strict';

const DataHelper = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelper();

const Banner = require('./banner.model');


module.exports = class BannerResource {

    async createOne(data = null) {
        console.log('BannerResource@createOne');

        if (!data || data === '') {
            throw new Error('data is required');
        }
        
        let result = await Banner.create(data);
        if (!result) {
            return false;
        }

        return result;
    }

    async getAll(data) {
        console.log('BannerResource@getAll');

        let whereCondition = {}

        if(data.service_id){
            whereCondition = {
                service_id: data.service_id
            };
        }

        let totalRecords = await Banner.count({
            where: whereCondition
        });

        let pagination = await _DataHelper.pagination(totalRecords, data.page, data.limit);

        let results;
        try {
            results = await Banner.findAll({
                where:whereCondition,
                offset: pagination.offset,
                limit: pagination.limit,
            });
        } catch (err) {
            Error.payload = err.errors ? err.errors : err.message;
            throw new Error();
        }

        if (results.length < 1) {
            return false;
        }

        let resObj = {
            total: totalRecords,
            current_page: pagination.pageNo,
            total_pages: pagination.totalPages,
            per_page: pagination.limit,
            data: results
        }

        return resObj;
    }

    async getOne(id){
        console.log("BannerResource@getOne")

        if (!id || id === '') {
            throw new Error('id is required');
        }

        let result = await Banner.findOne({
            where: {
                id: id
            },
        })

        if(!result){
            return false;
        }

        return result;
    }

    async updateOne(id, data) {
        console.log('BannerResource@updateOne');
        try {
            await Banner.update(data, {
                where: {
                    id: id
                }
            });
        } catch (err) {
            console.log(err.message)
            Error.payload = err.errors ? err.errors : err.message;
            throw new Error();
        }

        return true;
    }

    async deleteOne(id) {
        console.log('BannerResource@deleteOne');

        try {
            await Banner.destroy({
                where: {
                    id: id
                }
            });
        } catch (err) {
            Error.payload = err.errors ? err.errors : err.message;
            throw new Error();
        }

        return true;
    }

}