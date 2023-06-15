const _ = require('lodash');

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const DataHelper = require('../../../helpers/v1/data.helpers')
const _DataHelper = new DataHelper()

const ReviewsResource = require('./reviews.resources');
const _Review = new ReviewsResource();

const OrderServices = require('./../../../services/orders.service')
const _OrderService = new OrderServices()


module.exports = class ReviewsController {

    async createOne(req, res) {

        console.log('ReviewsController@createOne');
        let data = _.pick(req.body, ['order_id', 'seller_id', 'driver_id', 'product_id', 'rating', 'comment', 'product_quality_rating', 'value_of_money_rating', 'images'])
        
        let reviewData = {
            user_id: req.user.unique_uuid,
            rating: data.rating,
            comment: data.comment,
            images: data.images,
            order_id: data.order_id
        };

        if(data.seller_id){
            await _Review.createOne({
                ...reviewData,
                flag_id: data.seller_id,
                flag: 'seller'
            });
        };

        if(data.product_id){
            await _Review.createOne({
                ...reviewData,
                flag_id: data.product_id,
                flag: 'product',
                product_quality_rating: data.product_quality_rating,
                value_of_money_rating: data.value_of_money_rating
            });
            // To Do manufacturer ratings
        };

        if(data.driver_id){
            await _Review.createOne({
                ...reviewData,
                flag_id: data.driver_id,
                flag: 'driver'
            });
        };

        return response.created('review created successfully', res, true);
    };

    async getOrderIdsByUser(req, res) {
        console.log("SupplyController@getOrderIdsByUser");

        const filterObj = {
            userId: req.user.unique_uuid
        };
        
        let result = await _Review.getOrderIds(filterObj)
        if (!result) {
            return response.notFound('not found', res, false);
        }
        
        return response.success('Order ids found', res, result);
    }

    async getAll(req, res) {
        console.log('ReviewsController@getAll');

        if (req.query.is_past == 'true' && req.query.flag == 'product') {
            // get past reviews
            let results = await _Review.getAll(req.body.page, req.body.limit, req.user.unique_uuid, req.query.flag);

            if (!results) {
                return response.notFound('no review found', res, false);
            }

            let ordersObj = await _OrderService.getOrderIds(req.headers['authorization'], req.query.page, req.query.limit, req.user.unique_uuid)
            
            let finalResult = []

            ordersObj.data.map(item1 => {
                results.data.map(item2 => {
                    if (item1.id == item2.order_id) {
                        let reviewObj = {}
                        reviewObj = { ...item1, review_details: item2 }
                        finalResult.push(reviewObj)
                    };
                });
            });

            return response.created('review get successfully', res, {
                total: results.total,
                current_page: results.current_page,
                total_pages: results.total_pages,
                per_page: results.per_page,
                data: finalResult
            });

        };

        if(req.query.is_past == 'false' && req.query.flag == 'product') {
            let ordersObj = await _OrderService.getOrderIds(req.headers['authorization'], req.query.page, req.query.limit, req.user.unique_uuid)

            let totalOrders = [];
            totalOrders = ordersObj.data;

            let reviewOrders = [];

            let results = await _Review.getAll(req.body.page, req.body.limit, req.user.unique_uuid, req.query.flag);

            reviewOrders = results.data;

            let finalResult = [];

            totalOrders.map(item1 => {
                reviewOrders.map(item2 => {
                    if (item1.id != item2.order_id) {
                        finalResult.push(item1)
                    };
                });
            });
            return response.created('review created successfully', res, {
                total: ordersObj.total,
                current_page: ordersObj.current_page,
                total_pages: ordersObj.total_pages,
                per_page: ordersObj.per_page,
                data: finalResult
            });
        };

    };

}