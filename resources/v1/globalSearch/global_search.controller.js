const _ = require('lodash');

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const DataHelper = require('../../../helpers/v1/data.helpers')
const _DataHelper = new DataHelper()

const ProductsResource = require('./../products/products.resources');
const _Product = new ProductsResource();

const CategoriesResource = require('./../category/categories.resources')
const _Category = new CategoriesResource()

const ServicesResource = require('./../services/services.resources')
const _Service = new ServicesResource()

const ElasticSearchServices = require('./../../../services/elasticsearch.service')
const _ElasticSearch = new ElasticSearchServices()

const TriggerApiServices = require('./../../../services/trigger_api')
const _TriggerApi = new TriggerApiServices()

const ProductServices = require('./../../../services/products.service')
const _ProductServices = new ProductServices()


module.exports = class GlobalSearchController {

    async getAllSearchByName(req, res) {
        console.log('GlobalSearchController@getAllSearchByName')
        let data = _.pick(req.query, ['search', 'service_id', 'page', 'limit']);
        let productIds = [], categoryIds = [], servicesIds = [], sellerIds = [];
        let products = {}, categories = {}, services = {}, sellers = {};

        let esresults = await _ElasticSearch.searchRecord(process.env.ELASTIC_GLOBAL_INDEX, data.search, data.page, data.limit)
        if (esresults.length < 1) {
            await _TriggerApi.triggerApis();
            esresults = await _ElasticSearch.searchRecord(process.env.ELASTIC_GLOBAL_INDEX, data.search, data.page, data.limit)
        }

        console.log("-----------------------------------------------------before foreach")

        if (esresults.length > 0) {
            esresults.forEach(async (element) => {
                let searchType = element._source.data.type;
                let searchId = element._source.data.id;
                if (searchType == process.env.ELASTIC_PRODUCT_INDEX) {
                    productIds.push(searchId);
                } else if (searchType == process.env.ELASTIC_CATEGORY_INDEX) {
                    categoryIds.push(searchId);
                } else if (searchType == process.env.ELASTIC_SERVICE_INDEX) {
                    servicesIds.push(searchId);
                } else if (searchType == process.env.ELASTIC_SELLER_INDEX) {
                    sellerIds.push(searchId);
                }
            });
            if (productIds.length > 0) {
                products = await _Product.getByIds({ productids: productIds, service_id: data.service_id }, data.page, data.limit);
                let sellers = await _ProductServices.getSellerByProducts(productIds)
                products.products.data.forEach(element => {
                    element.dataValues.product_sellers=[];
                    sellers.forEach(seller => {
                        if (seller.product_id == element.id) {
                            element.dataValues.product_sellers = seller.sellers
                        }
                    });
                });
            }
            if (categoryIds.length > 0) {
                categories = await _Category.getByIds(categoryIds, data.page, data.limit);
            }
            if (servicesIds.length > 0) {
                services = await _Service.getByIds(servicesIds, data.page, data.limit);
            }
            if (sellerIds.length > 0) {
                services = await _TriggerApi.getSellerByIds(sellerIds, data.page, data.limit);
            }
        }

        let results = { ...products, ...categories, ...services, ...sellers }
        if (!esresults) {
            return response.notFound('no Data found', res, false);
        }

        return response.success('Data found', res, results);
    }

    async creatSellerInES(req, res) {
        console.log('GlobalSearchController@creatSellerInES');
        let data = _.pick(req.body, ['name', 'id'])
        let result = await _ElasticSearch.createRecord(process.env.ELASTIC_GLOBAL_INDEX, { id: data.id, name: data.name, type: process.env.ELASTIC_SELLER_INDEX })
        return response.created('seller added successfully', res, result);
    }

    async listCreatSellerInES(req, res) {
        console.log('GlobalSearchController@listCreatSellerInES')
        let data = _.pick(req.body, ['sellerdata'])
        if (!data) {
            return response.badRequest('no seller found', res, false);
        }

        if (data.sellerdata.length > 0) {
            data.sellerdata.forEach(async (element) => {
                if (element.username != null) {
                    let results = await _ElasticSearch.searchRecordByNameAndType(process.env.ELASTIC_GLOBAL_INDEX, { type: process.env.ELASTIC_SELLER_INDEX, name: element.username })
                    if (results.length < 1) {
                        await _ElasticSearch.createRecord(process.env.ELASTIC_GLOBAL_INDEX, { id: element.id, name: element.username, type: process.env.ELASTIC_SELLER_INDEX })
                    }
                }
            });
        }
        return response.success('products found', res, results);
    }
}   