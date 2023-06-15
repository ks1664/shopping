const axios = require('axios')

const DataHelper = require('../helpers/v1/data.helpers')
const _DataHelper = new DataHelper()

module.exports = class OrderServices {
    constructor() {
        this.headers = {
            'Content-Type': 'application/json'
        }

        this.orderInstance = axios.create({
            baseURL: process.env.ORDER_URL + '/api/v1/',
            timeout: 30000,
            headers: this.headers
        });
    }

    async getTrendingIds(authToken, slug, limit = null, service_id = null, seller_id = null) {
        console.log("OrderServices@getTrendingIds");

        this.orderInstance.defaults.headers.Authorization = authToken;

        try {
            let url = `order_details/trending-ids?limit=${limit}&slug=${slug}`;
            if(service_id){
                url = url + `&service_id=${service_id}`
            }

            if(seller_id){
                url = url + `&seller_id=${seller_id}`
            }

            let results = await this.orderInstance.get(url)
            if (results.status !== 200) {
                return false;
            }
            
            return results.data.payload
        }
        catch (err) {
            console.log(err.message);
            return false;

        }
    }

    async getTopSellingProductIds(authToken, filterData = {}) {
        console.log("OrderServices@getTopSellingProductIds");

        this.orderInstance.defaults.headers.Authorization = authToken;

        try {
            const { seller_id } = filterData;
            let url = `order_details/top-selling-product-ids?seller_id=${seller_id}`;
            
            let results = await this.orderInstance.get(url)

            if (results.status !== 200 || !results.data) {
                return false;
            }
            
            return results?.data?.payload ? results.data.payload : false;
        }
        catch (err) {
            console.log(err.message);
            return false;

        }
    }

    async getProductIdAndOrderForReview(authToken, filterData = {}) {
        console.log("OrderServices@getProductIdAndOrderForReview");

        this.orderInstance.defaults.headers.Authorization = authToken;

        try {
            const { orderIds, userId } = filterData;

            let url = `order_details/product-and-order-for-review?`;
            let params = {};

            if(userId && userId != ''){
                params = {...params, user_id: userId}
            }

            if(orderIds && orderIds != ''){
                params = {...params, order_ids: orderIds}
            }

            var queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
            url = url + queryString;

            let results = await this.orderInstance.get(url)

            if (results.status !== 200 || !results.data) {
                return false;
            }
            
            return results?.data?.payload ? results.data.payload : false;
        }
        catch (err) {
            return false;

        }
    }

}