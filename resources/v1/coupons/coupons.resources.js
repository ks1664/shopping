'use strict';

const { Op } = require("sequelize");
const sequelize = require('sequelize');
const DataHelper = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelper();

const Coupon = require('./coupon.model');

module.exports = class CouponsResource {

    async getAll(pageNo = null, limit = null, filterDataObj = {}) {
        console.log('CouponResources@getAll');

        const {sellerId, serviceId} = filterDataObj;
        let whereCondition = {
            [Op.or]: [
                {
                    end_time: {
                        [Op.gt]: new Date()
                    }
                },
                {
                    end_time: null
                }
            ]
        };

        if(sellerId && sellerId != ''){
            whereCondition = {
               seller_id: sellerId
            }
        }

        if(serviceId && serviceId != ''){
            whereCondition = {
                ...whereCondition,
                service_id: serviceId
            }
        }

        let totalRecords = await Coupon.count({
            where: whereCondition
        });

        let pagination = await _DataHelper.pagination(totalRecords, pageNo, limit);
        
        let results;
        try {
            results = await Coupon.findAll({
                where: whereCondition,
                order: [
                    ['created_at', 'DESC']
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

    async getOne(code) {
        console.log('CouponResources@getOne');
        if (!code || code === '') {
            throw new Error('code is required');
        }
        let result = await Coupon.findOne({
            where: {
                code : code
            }
            
        })

        if(!result){
            return false;
        }

        return result;
    }

}