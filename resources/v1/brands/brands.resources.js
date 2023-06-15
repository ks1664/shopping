'use strict';

const Op = require('sequelize').Op;

const DataHelper = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelper();

const Brand = require('./brand.model');


module.exports = class BrandsResource {

    async createOne(data = null) {
        console.log('BrandsResource@createOne');

        if (!data || data === '') {
            throw new Error('data is required');
        }
        
        let result = await Brand.create(data);
        if (!result) {
            return false;
        }

        return result;
    }

    async getAll(data) {
        console.log('BrandsResource@getAll');

        const {page, limit, service_ids, search} = data;
        let whereCondition = {};

        if(service_ids && service_ids.length > 0){
            whereCondition = {
                ...whereCondition,
                service_id: {
                    [Op.in]: service_ids
                }
            }
        }

        if(search && search != ''){
            whereCondition = {
                ...whereCondition,
                name: {
                    [Op.like]: "%" + search + "%"
                }
            }
        }

        // get a count of all the brands
        let totalRecords = await Brand.count({
            where: whereCondition
        });


        let pagination = await _DataHelper.pagination(totalRecords, page, limit);
        let results;

        try {
            results = await Brand.findAll({
                where: whereCondition,
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

    async updateOne(id, data) {
        console.log('BrandsResource@updateOne');
        try {
            await Brand.update(data, {
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
        console.log('BrandsResource@deleteOne');
        try {
            await Brand.destroy({
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

    async getByColumnNameAndValue(columnName, columnvalue){
        console.log("BrandsResource@getByColumnNameAndValue")

        let result = await Brand.findOne({
            where: {
                [columnName]: columnvalue
            },
            // logging: false
        })

        if(!result){
            return false;
        }

        return result;
    }

}