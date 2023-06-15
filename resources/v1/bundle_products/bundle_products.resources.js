'use strict';

const { Op } = require("sequelize");

const DataHelper = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelper();
const Sequelize = require('sequelize')

const BundleProduct = require('./bundle_products.model');

module.exports = class BundleProductResource {

    async createOne(data = null) {
    
        console.log('BundleProductResource@createOne');
        if (!data || data === '') {
            throw new Error('data is required');
        }
        
        let result = await BundleProduct.create(data);
        if (!result) {
            return false;
        }

        return result;
    }

    async getAll(pageNo = null, limit = null, productId = null) {
        console.log('BundleProductResource@getAll');

        let whereCondition = {};
        if(productId){
            whereCondition = {
                ...whereCondition,
                product_id: productId
            }
        }

        // get a count of all the folders
        let totalRecords = await BundleProduct.count({
            where: whereCondition
        });
        
        let pagination = await _DataHelper.pagination(totalRecords, pageNo, limit);
        
        let results;
        try {
            results = await BundleProduct.findAll({
                where: whereCondition,
                include: [
                    {
                        association: 'products',
                    }
                ],
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

    async getOneByColumnNameAndValue(columnName = null, columnValue = null) {
        console.log('BundleProductResource@getOneByColumnNameAndValue');

        let result;
        try {
            result = await BundleProduct.findOne({
                where: {
                    [columnName]: columnValue
                },
                include: [
                    {
                        association: 'products',
                    }
                ]
            });
        } catch (err) {
            Error.payload = err.errors ? err.errors : err.message;
            throw new Error();
        }

        return result;
    }


}