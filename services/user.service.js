const axios = require('axios')

const DataHelper = require('./../helpers/v1/data.helpers')
const _DataHelper = new DataHelper()

module.exports = class UserServices {

    constructor(){
        this.headers  = {
            'Content-Type' : 'application/json'
        }

        this.userInstance = axios.create({
            baseURL: process.env.AUTH_URL + '/api/v1/',
            timeout: 30000,
            headers: this.headers
        });
    }


    async getUserProfileByUuid(authToken, sellerUuid){
        console.log("UserServices@getUserProfileByUuid");
        try{

            if(authToken){
                this.userInstance.defaults.headers.Authorization = authToken;
            }

            let url = 'users/uuid/' + sellerUuid 
                
            let result = await this.userInstance.get(url)
            if(result.status !== 200){
                return false;
            }

            return result?.data?.payload ? result.data.payload : false;
        }
        catch(err){
            console.log(err.message);
            return false;
        }

    }

    async getSellers(authToken, filterObj = {}){
        console.log("UserServices@getSellers");
        try{

            this.userInstance.defaults.headers.Authorization = authToken;
            const {page, limit, serviceId, needTrending} = filterObj;

            if(!page)
                page = 1;

            if(!limit)
                limit = 10;

            let url = 'users/sellers?page=' + page + '&limit=' + limit;
            
            if(serviceId && serviceId != '')
                url = url + '&service_id=' + serviceId;

            if(needTrending && needTrending != '')
                url = url + '&need_trending=' + needTrending;

            let results = await this.userInstance.get(url)

            if(results.status !== 200){
                return false;
            }

            return results?.data?.payload ? results.data.payload : false
        }
        catch(err){
            console.log(err.message);
            return false;
        }

    }

    async getUserProfileByUids(authToken, userUids){
        console.log("UserServices@getUserProfileByUids");
        try{

            if(authToken){
                this.userInstance.defaults.headers.Authorization = authToken;
            }

            userUids = userUids.toLocaleString();
            let url = 'users/profile-by-uids?user_uids='+ userUids
                
            let result = await this.userInstance.get(url);
            if(result.status !== 200){
                return false;
            }
            
            return result?.data?.payload ? result.data.payload : false;
        }
        catch(err){
            console.log(err.message);
            return false;
        }
    }


    async getFavouriteByUserAndSellerId(authToken, seller_id){
        console.log("UserServices@getFavouriteByUserAndSellerId");

        try{

            if(authToken){
                this.userInstance.defaults.headers.Authorization = authToken;
            }

            let url = 'favourites/' + seller_id;
                
            let result = await this.userInstance.get(url)
            if(result.status !== 200){
                return false;
            }

            return result?.data?.payload ? result.data.payload : false;
        }
        catch(err){
            console.log(err.message);
            return false;
        }

    }

}