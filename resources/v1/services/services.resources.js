'use strict';
const Op = require('sequelize').Op;

const DataHelper = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelper();

const Service = require('./service.model');

module.exports = class ServicesResource {

    async createOne(data = null) {
        console.log('ServicesResource@createOne');

        if (!data || data === '') {
            throw new Error('data is required');
        }

        let result = await Service.create(data);
        if (!result) {
            return false;
        }

        return result;
    }

    async getOneByColumnNameAndValue(columnName, columnValue){
        console.log("ServicesResource@getOneByColumnNameAndValue")

        if (!columnName || columnName === '' || !columnValue || columnValue === '') {
            throw new Error('columnName & columnValue is required');
        }

        let result = await Service.findOne({
            where: {
                [columnName]: columnValue
            },
            // logging: false
        })

        if(!result){
            return false;
        }

        return result;
    }


    async getAll(pageNo = null, limit = null, type = null) {
        console.log('ServicesResource@getAll');
        
        let whereCondition = {};
        if(type && type != ''){
            whereCondition = {
                ...whereCondition,
                type: type.trim()
            }
        }

        // get a count of all the folders
        let totalRecords = await Service.count({
            where: whereCondition
        });

        let pagination = await _DataHelper.pagination(totalRecords, pageNo, limit);

        let results;
        try {
            results = await Service.findAll({
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
        console.log('ServicesResource@updateOne');
        try {
            await Service.update(data, {
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
        console.log('ServicesResource@deleteOne');
        
        try {
            await Service.destroy({
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

    async isServiceExist(columnName, columnValue) {
        console.log("ServicesResource@isServiceExist");

        if (!columnName || columnName === '' || !columnValue || columnValue === '') {
            throw new Error('columnName & columnValue is required');
        }

        let servicesCount = await Service.count({
            where: {
                [columnName]: columnValue
            }
        })

        if (!servicesCount || servicesCount <= 0) {
            return false;
        }

        return true;
    }

    async deleteData() {
        console.log('ServicesResource@deleteData');

        let result = await Service.truncate()
       
        if (!result) {
            return false;
        }

        return result;
    }
        
}                                                                                                                        