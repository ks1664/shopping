const axios = require('axios')
module.exports = class TriggerApiServices {
    constructor() {
        this.headers = {
            'Content-Type': 'application/json'
        }

        this.productInstance = axios.create({
            baseURL: process.env.SELF_URL + '/api/v1/',
            timeout: 30000,
            headers: this.headers
        });

        this.userInstance = axios.create({
            baseURL: process.env.AUTH_URL + '/api/v1/',
            timeout: 30000,
            headers: this.headers
        });
    }

    async triggerApis() {
        console.log("TriggerApiServices@triggerApis");
        try {
            let urls = ['products', 'categories', 'services']
            urls.forEach(async (element) => {
                let data = await this.productInstance.get(element)
                if (data.status !== 200) {
                    return false;
                }
            });
            this.triggerSellerListApi();
            return true;

        }
        catch (err) {
            console.log(err.message);
            return false;

        }
    }

    async triggerSellerListApi() {
        console.log("TriggerApiServices@triggerSellerListApi");
        try {
            let url = 'user_profiles'
            let data = await this.userInstance.get(url)
            if (data.status !== 200) {
                return false;
            }
            return true;
        }
        catch (err) {
            console.log(err.message);
            return false;

        }
    }

    async getSellerByIds(sellerids, page = null, limit = null) {
        console.log("TriggerApiServices@getSellerByIds");
        try {
            let url = 'users/getusersbyids/'
            let user = await this.userInstance.post(url, { ids: sellerids, page: page, limit: limit })
            if (user.status !== 200) {
                return false;
            }
            return user.data.payload
        }
        catch (err) {
            console.log(err.message);
            return false;

        }
    }

}