'use strict';
const Op = require('sequelize').Op;
const sequelize = require('sequelize');

const DataHelper = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelper();

const Supply = require('./supply.model');

const VALID_PRODUCT_QUERY_STRING = ' price > 0 AND rest_quantity > 0 AND status = 1 ';

module.exports = class SupplyResource {

    constructor() {
        this.validProductQueryString = VALID_PRODUCT_QUERY_STRING;
    }

    async createOne(data = null) {
        console.log('SupplyResource@createOne');

        if (!data || data === '') {
            throw new Error('data is required');
        }

        let result = await Supply.create(data);
        if (!result) {
            return false;
        }

        return result;
    }

    async getAll(pageNo = null, limit = null, filterObj = {}) {
        console.log('SupplyResource@getAll');

        const { seller_id, product_ids, product_id } = filterObj;

        let whereCondition = {
            price: {
                [Op.gt]: 0
            },
            rest_quantity: {
                [Op.gt]: 0
            },
            status: '1'
        };

        if (seller_id && seller_id != '') {
            whereCondition = {
                ...whereCondition,
                seller_id: seller_id
            }
        }

        if (product_id && product_id != '') {
            whereCondition = {
                ...whereCondition,
                product_id: product_id
            }
        }

        if (product_ids && product_ids.length > 0) {
            whereCondition = {
                ...whereCondition,
                product_id: {
                    [Op.in]: product_ids
                }
            }
        }

        // get a count of all the folders
        let totalRecords = await Supply.count({
            where: whereCondition
        });

        let pagination = await _DataHelper.pagination(totalRecords, pageNo, limit);

        let results;
        try {
            results = await Supply.findAll({
                where: whereCondition,
                order: [
                    ['created_at', 'DESC']
                ],
                offset: pagination.offset,
                limit: pagination.limit
            })

        } catch (err) {
            Error.payload = err.errors ? err.errors : err.message;
            throw new Error();
        }

        if (results.length < 1) {
            return false;
        }

        let resObj = {
            total: totalRecords.length,
            current_page: pagination.pageNo,
            total_pages: pagination.totalPages,
            per_page: pagination.limit,
            data: results
        }

        return resObj;
    }

    async getRecentlyAddedSellers(limit = 5) {
        console.log('SupplyResource@getRecentlyAddedSellers');

        let whereCondition = {
            price: {
                [Op.gt]: 0
            },
            rest_quantity: {
                [Op.gt]: 0
            },
            status: '1'
        };


        let results;
        try {
            results = await Supply.findAll({
                attributes: [
                    [sequelize.fn('DISTINCT', sequelize.col('seller_id')), 'seller_id']
                ],
                where: whereCondition,
                order: [
                    [sequelize.fn('max', sequelize.col('created_at')), 'DESC']
                ],
                group: ['seller_id'],
                limit: limit
            })

        } catch (err) {
            Error.payload = err.errors ? err.errors : err.message;
            throw new Error();
        }

        if (results.length < 1) {
            return false;
        }

        return results;
    }

    async getSellerIds(filterObj) {
        console.log('SupplyResource@getSellerIds');

        const { categoryId } = filterObj;
        let whereCondition = {
            price: {
                [Op.gt]: 0
            },
            rest_quantity: {
                [Op.gt]: 0
            },
            status: '1'
        };

        if(categoryId && categoryId != ''){
            whereCondition = {
                ...whereCondition,
                product_id: {
                    [Op.in]: sequelize.literal(`(SELECT id FROM products WHERE category_id = '${categoryId }')`)
                }
            }
        }

        let results;
        try {
             results = await Supply.findAll({
                where: whereCondition,
                group: ['seller_id'],
                attributes: ['seller_id'],
                logging: console.log
            });
            
            if (!results) {
                return false;
            }
    
            const sellerIds = results.map((item) => item.seller_id);
            return sellerIds;
          
        } catch (err) {
            Error.payload = err.errors ? err.errors : err.message;
            throw new Error();
        }

    }
}