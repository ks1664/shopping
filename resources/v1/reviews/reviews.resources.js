'use strict';
const Op = require('sequelize').Op;
const DataHelper = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelper();
const Sequelize = require('sequelize')

const Review = require('./review.model');


module.exports = class ReviewsResource {

    async createOne(data = null) {
    
        console.log('ReviewsResource@createOne');
        if (!data || data === '') {
            throw new Error('data is required');
        }
        
        let result = await Review.create(data);

        if (!result) {
            return false;
        }

        return result;
    }

    async getOrderIds(filterObj) {
        console.log('SupplyResource@getOrderIds');

        const { userId } = filterObj;
        let whereCondition = {};

        if(userId && userId != ''){
            whereCondition = {
                ...whereCondition,
                user_id: userId
            }
        }

        let results;
        try {
             results = await Review.findAll({
                where: whereCondition,
                group: ['order_id'],
                attributes: ['order_id']
            });
            
            if (!results) {
                return false;
            }

            const orderIds = results.map((item) => item.order_id);
            return orderIds;
          
        } catch (err) {
            Error.payload = err.errors ? err.errors : err.message;
            throw new Error();
        }

    }


    // async getAll(pageNo = null, limit = null , unique_uuid = null, flag = null ) {
    //     console.log('ReviewsResource@getAll');

    //     let whereCondition = {
    //         user_id : unique_uuid,
    //         flag: flag
    //     }

    //     // get a count of all the folders
    //     let totalRecords = await Review.count({
    //         where : whereCondition
    //     });

    //     let pagination = await _DataHelper.pagination(totalRecords, pageNo, limit);

    //     let results;

    //     try {
    //         results = await Review.findAll({
    //             attributes:['id', 'user_id', 'order_id','flag_id', 'rating', 'comment', 'flag'],
    //             where : whereCondition,
    //             offset: pagination.offset,
    //             limit: pagination.limit
    //         });
    //     } catch (err) {
    //         Error.payload = err.errors ? err.errors : err.message;
    //         throw new Error();
    //     }

    //     if (results.length < 1) {
    //         return false;
    //     }

    //     let resObj = {
    //         total: totalRecords,
    //         current_page: pagination.pageNo,
    //         total_pages: pagination.totalPages,
    //         per_page: pagination.limit,
    //         data: results
    //     }

    //     return resObj;
    // }


    // async getAverageRating(id = null) {
    
    //     console.log('ReviewsResource@getAverageRating');
    //     if (!id || id === '') {
    //         throw new Error('id is required');
    //     }
        
    //     let result = await Review.findAll({
    //         where : {
    //             product_id : id
    //         }
    //     })

    //     if (!result) {
    //         return false;
    //     }

    //     return result;
    // }

    // async sellerRatingsByProductId(id = null) {
    
    //     console.log('ReviewsResource@sellerRatings');
    //     if (!id || id === '') {
    //         throw new Error('id is required');
    //     }
        
    //     let result = await Review.findAll({
    //         where : {
    //             seller_id : {
    //                 [Op.in] : Sequelize.literal(`(select seller_id from product_management.reviews where product_id=${id})`)
    //             }   
    //         },
    //         attributes: [
    //             [Sequelize.fn('AVG', Sequelize.col('rating')), 'avg_rating'],
    //             [Sequelize.fn('COUNT', Sequelize.col('rating')), 'total_count'],
    //             'seller_id'
    //         ],
    //         group : 'seller_id'
    //     })

    //     if (!result) {
    //         return false;
    //     }

    //     return result;
    // }

}