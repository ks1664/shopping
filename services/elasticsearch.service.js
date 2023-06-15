require('dotenv').config();
const { Client } = require('@elastic/elasticsearch')

const DataHelper = require('./../helpers/v1/data.helpers')
const _DataHelper = new DataHelper()

module.exports = class ElasticSearchServices {

    constructor(){
        this.client = new Client({
            node: {
                url : new URL(process.env.ELASTIC_SEARCH_HOST)
            }
        })        
    }

    async createRecord(index = null, data){
        console.log("ElasticSearchServices@createRecord",data)
        this.client.index({
            index: index,
            body: {
                data
            }
        }).then(async (res) => {
            return await this.getRecordById(index, res._id)
        }).catch(err => {
            console.log(err)
            return false
        })
    }

    async getRecordById(index, id){
        console.log("ElasticSearchServices@getRecordById")
        this.client.get({
            index: index,
            id: id
        }).then(resp => {
            console.log("ElasticSearchServices getRecordById Res :", resp)
            return resp
        }).catch(err => {
            return false
        })
    }

    async updateRecordById(index, id, data){
        console.log("ElasticSearchServices@getRecordById")
        this.client.update({
            index: index,
            id: id,
            body: {
                doc: data
            }
        }).then(resp => {
            console.log("ElasticSearchServices Res :", resp)
            return resp
        }).catch(err => {
            return false
        })
    }

    async deleteRecordById(index, id){
        console.log("ElasticSearchServices@deleteRecordById")
        this.client.delete({
            index: index,
            id: id,
        }).then(resp => {
            console.log("ElasticSearchServices Res :", resp)
            return resp
        }).catch(err => {
            return false
        })
    }

    async searchRecordByNameAndType(index, search, page=null, limit=null){
        console.log("ElasticSearchServices@searchRecordByNameAndType")
        
        try{
            let resp = await this.client.search({
                index: index,
                // from: page,
                // size: limit,
                query: {
                    bool: {
                        must : [
                            {
                                match:{
                                    "data.name" : search.name,
                                }
                            },
                            {
                                match:{
                                    "data.type" : search.type,
                                }
                            }
                        ]
                    }
                },
            })

            return resp.hits.hits
        }
        catch(err){
            console.log("err", err)
            return  false
        }

    }
    
    async searchRecord(index, search, page=null, limit=null){
        console.log("ElasticSearchServices@searchRecord", search)
        
        try{
            let resp = await this.client.search({
                index: index,
                from: page,
                size: limit,
                query: {
                    wildcard: {
                        "data.name" :{
                            value:`*${search}*`
                        }
                    }
                },
            })

            return resp.hits.hits
        }
        catch(err){
            console.log("err", err)
            return  false
        }

    }

    // async searchRecord(index, search, page=null, limit=null){
    //     console.log("ElasticSearchServices@searchRecord", search)
        
    //     try{
    //         let resp = await this.client.search({
    //             index: index,
    //             from: page,
    //             size: limit,
    //             query: {
    //                 bool: {
    //                     should : [
    //                         {
    //                             match:{
    //                                 "data.name" : search
    //                             }
    //                         }
    //                     ]
    //                 }
    //             },
    //         })

    //         return resp.hits.hits
    //     }
    //     catch(err){
    //         console.log("err", err)
    //         return  false
    //     }

    // }
}