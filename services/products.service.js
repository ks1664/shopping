const axios = require('axios')

const DataHelper = require('./../helpers/v1/data.helpers')
const _DataHelper = new DataHelper()

module.exports = class ProductServices {
    constructor() {
        this.headers = {
            'Content-Type': 'application/json'
        }

        this.inventoryInstance = axios.create({
            baseURL: process.env.INVENTORY_URL + '/api/v1/',
            timeout: 30000,
            headers: this.headers
        });
    }
    
    async getSellerByProducts(productids) {
        console.log("ProductServices@getProductsBySeller");
        try {
            let url = 'supplies/get-seller-by-product-id/';
            let sellers = await this.inventoryInstance.post(url,{productids:productids});
            if (sellers.status !== 200) {
                return false;
            }
            return sellers.data.payload
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        catch (err) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
            console.log(err.message);
            return false;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

        }
    }

}