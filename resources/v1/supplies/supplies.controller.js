const _ = require('lodash');

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const ResponseDataHelper = require('../../../helpers/v1/data.helpers');
const DataHelper = new ResponseDataHelper();

const SupplyResource = require('./supplies.resources');
const _Supply = new SupplyResource();

const ReviewResource = require('../reviews/reviews.resources');
const _Review = new ReviewResource();

const ProductResource = require('../products/products.resources');
const _Product = new ProductResource();

const CouponsResource = require('../coupons/coupons.resources');
const _Coupons = new CouponsResource();

const UserService = require('../../../services/user.service')
const _User = new UserService()

module.exports = class SupplyController {

    async getSellerInfoWithProductsAndOffers(req, res) {
        console.log('SupplyController@getSellerInfoWithProductsAndOffers');
        let data = _.pick(req.body, ['page', 'limit'])
        
        const products = await _Product.getAll(data.page, data.limit, { sellerId: req.params.sellerId });

        if(products?.data){
            for(let product of products.data){
                // Appended the product price (Fetched by the supplier data)
                if(product.supplies && product.supplies.length > 0){
                    product.setDataValue('price', product.supplies[0].price);
                }

                // product.setDataValue('product_attribute', undefined);
                // product.setDataValue('product_ingredient', undefined);
            }
        }

        // get seller details 
        let sellerDetails = await _User.getUserProfileByUuid(req.headers['authorization'], req.params.sellerId)
        
        //show seller offers list
        let sellerOffersList = await _Coupons.getAll(1, 100, { sellerId: req.params.sellerId })

        //  // show seller ratings
        // let sellerRatings = await _Review.sellerRatings(req.params.id)

        const sellerLocations = sellerDetails?.user_locations ? sellerDetails.user_locations.sort((a, b) => b.is_current - a.is_current) : [];
    
        // calculate distance and time
        let toDistanceInKM = 0;
        if(sellerLocations.length > 0 && req.query.lat && req.query.long){
            toDistanceInKM = await DataHelper.getDistanceFromLatLonInKm(sellerLocations[0].latitude, sellerLocations[0].longitude, req.query.lat, req.query.long)
            toDistanceInKM = Math.round(toDistanceInKM * 100)/100;
        }

        let toDistanceTime = toDistanceInKM ? Math.round((toDistanceInKM / process.env.AVG_SPEED_CALC_TIME) * 60) : 0;
        let toDistanceTimeString = await DataHelper.calcHoursMinutes(toDistanceTime);
        let deliveryFee = await DataHelper.calculateDeliveryFee(toDistanceInKM);

        // To Do
        const sellerRating = {
            rating: 3.7,
            review_count: 5
        };

        let is_favourite = false
        if(req?.user?.id){
            let favouriteObj = await _User.getFavouriteByUserAndSellerId(req.headers['authorization'], sellerDetails.id);
            if(favouriteObj)
                is_favourite = true
        }  

        let result = { 
            products : products ,
            sellerCurrentLocation : sellerLocations && sellerLocations.length > 0 ? sellerLocations[0] : {},
            sellerOffersList : sellerOffersList?.data ? sellerOffersList.data : [],
            sellerRating: sellerRating,
            distance: {
                inKM: toDistanceInKM,
                time: toDistanceTime,
                timeString: toDistanceTimeString
            },
            deliveryFee : deliveryFee ,
            sellerDetails : sellerDetails,
            isFavourite : is_favourite
        };

        return response.success('products found', res, result);

    }

    async productsAvailabilityStatus(req, res) {
        console.log('SupplyController@productsAvailabilityStatus');

        const productIds = req.query.product_ids.split(',').filter(item => item);
        const filterObj = {
            seller_id: req.query.seller_id,
            product_ids: productIds
        };

        let result = await _Supply.getAll(1, 100, filterObj);
        if (!result || !result.data || result.data.length < productIds.length) {
            return response.forbidden('Seller does not have some products', res, false);
        }

        return response.success('Seller products found', res, result.data);
    }

    async getSellerIds(req, res) {
        console.log("SupplyController@getSellerIds");
        
        let data = _.pick(req.body, ['category_id'])

        const filterObj = {
            categoryId: data.category_id
        };
        
        let result = await _Supply.getSellerIds(filterObj)
        if (!result) {
            return response.notFound('not found', res, false);
        }
        
        return response.success('Seller ids found', res, result);
    }

}