'use strict';
const Op = require('sequelize').Op;
const sequelize = require('sequelize');

const DataHelper = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelper();

const CategoryResource = require('./../category/categories.resources');
const _category = new CategoryResource();

const SupplyResource = require('./../supplies/supplies.resources');
const _Supply = new SupplyResource();



const Product = require('./product.model');

module.exports = class ProductsResource {

    async fetchCategoryIdsBySellerId(sellerId = null) {
        console.log('ProductsResource@fetchCategoryIdsBySellerId');

        if (!sellerId || sellerId === '') {
            throw new Error('sellerId is required');
        }

        let results = await Product.findAll({
            where: {
                id: {
                    [Op.in]: sequelize.literal("(SELECT product_id FROM supplies WHERE seller_id = '" + sellerId + "')")
                }
            },
            attributes: ['category_id'],
            raw: true,
            group: ['category_id']
        });

        if (!results) {
            return false;
        }

        const categoryIds = await results.map((item) => item.category_id);
        return categoryIds;
    }

    async insertMultipleProducts(data) {
        console.log('ProductsResource@insertMultipleProducts');

        if (!data || data === '') {
            throw new Error('data is required');
        }

        try {
            let results = await Product.bulkCreate(data)
            if (!results) {
                return false;
            }

            return results;

        } catch (err) {
            Error.payload = err.errors ? err.errors : err.message;
            throw new Error();
        }
    }

    async getAll(pageNo = null, limit = null, filterDataObj = {}) {
        console.log('ProductsResource@getAll');

        const { search, sellerId, serviceId, brandId, categoryIds, productIds, serviceType } = filterDataObj;

        const validProductQueryString = _Supply.validProductQueryString;

        let whereCondition = {
            id: {
                [Op.in]: sequelize.literal("(SELECT product_id FROM supplies WHERE" + validProductQueryString + ")")
            }
           
        };

        if (productIds && productIds.length > 0 && sellerId && sellerId != '') {
            whereCondition = {
                id: {
                    [Op.in]: sequelize.literal("(SELECT product_id FROM supplies WHERE seller_id = '" + sellerId + "' AND " + validProductQueryString + " AND product_id IN (" + productIds + "))")
                },
            }
        }
        else if (sellerId && sellerId != '') {
            whereCondition = {
                id: {
                    [Op.in]: sequelize.literal("(SELECT product_id FROM supplies WHERE seller_id = '" + sellerId + "' AND " + validProductQueryString + ")")
                }
            }
        }
        else if (productIds && productIds.length > 0) {
            whereCondition = {
                id: {
                    [Op.in]: productIds
                }
            }
        }

        if (search && search != '') {
            whereCondition = {
                ...whereCondition,
                name: {
                    [Op.like]: "%" + search + "%"
                }
            }
        }

        if (serviceId && serviceId != '' && serviceType && serviceType != '') {
            whereCondition = {
                ...whereCondition,
                [Op.and]: [
                    {
                        service_id: serviceId
                    },
                    {
                        service_id: {
                            [Op.in]: sequelize.literal("(SELECT id FROM services WHERE type = '" + serviceType + "')")
                        }
                    }
                ]
                
            }
        }
        else if (serviceId && serviceId != '') {
            whereCondition = {
                ...whereCondition,
                service_id: serviceId
            }
        }
        else if(serviceType && serviceType != ''){
            whereCondition = {
                ...whereCondition,
                service_id: {
                    [Op.in]: sequelize.literal("(SELECT id FROM services WHERE type = '" + serviceType + "')")
                }
            }
        }
        
        if (brandId && brandId != '') {
            whereCondition = {
                ...whereCondition,
                brand_id: brandId
            }
        }        

        if (categoryIds && categoryIds.length > 0) {
            whereCondition = {
                ...whereCondition,
                category_id: {
                    [Op.in]: categoryIds
                }
            }
        }

        let supplyIncludeArr = [
            {
                association: 'supplies',
                separate: true,
                order: [
                    ['price', 'ASC']
                ]
            }
        ];

        if (sellerId && sellerId != '') {
            supplyIncludeArr = [
                {
                    association: 'supplies',
                    where: {
                        seller_id: sellerId
                    },
                    separate: true,
                    order: [
                        ['price', 'ASC']
                    ]
                }
            ]
        }

        // get a count of all the products
        let totalRecords = await Product.count({
            where: whereCondition
        });

        let pagination = await _DataHelper.pagination(totalRecords, pageNo, limit);

        let results;
        try {
            results = await Product.findAll({
                where: whereCondition,
                order: [
                    ['created_at', 'DESC']
                ],
                include: [
                    ...supplyIncludeArr,
                    {
                        association: 'brand',
                        attributes: ['name']
                    },
                    {
                        attributes: ['name'],
                        association: 'category'
                    },
                    {
                        attributes: ['id'],
                        association: 'product_ingredient',
                        include: [
                            {
                                attributes: ['id', 'name', 'description', 'health_rating'],
                                association: 'ingredient'
                            }
                        ]
                    },
                    {
                        attributes: ['id'],
                        association: 'product_attribute',
                        include: [
                            {
                                attributes: ['id', 'name', 'required_value_count'],
                                association: 'attributes',
                                include: [
                                    {
                                        attributes: ['id', 'name', 'price'],
                                        association: 'attribute_values'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        attributes: ['product_id', 'url'],
                        association: 'product_images'
                    },
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

    async createOne(data = null) {
        console.log('ProductsResource@createOne');

        if (!data || data === '') {
            throw new Error('data is required');
        }

        let result = await Product.create(data);
        if (!result) {
            return false;
        }

        return result;
    }

    async getOneByColumnNameAndValue(columnName, columnValue) {
        console.log("ProductsResource@getOneByColumnNameAndValue");

        if (!columnName || columnName === '' || !columnValue || columnValue === '') {
            throw new Error('columnName & columnValue is required');
        }

        let result = await Product.findOne({
            where: {
                [columnName]: columnValue
            },
            include: [
                {
                    association: 'supplies',
                    separate: true,
                    order: [
                        ['price', 'ASC']
                    ]
                },
                {
                    attributes: ['name', 'id'],
                    association: 'brand'
                },
                {
                    attributes: ['url'],
                    association: 'product_images'
                },
                {
                    attributes: ['name', 'id'],
                    association: 'category'
                },
                {
                    attributes: ['id'],
                    association: 'product_ingredient',
                    include: [
                        {
                            attributes: ['id', 'name', 'description', 'health_rating'],
                            association: 'ingredient'
                        }
                    ]
                },
                {
                    attributes: ['id'],
                    association: 'product_attribute',
                    include: [
                        {
                            attributes: ['id', 'name', 'required_value_count'],
                            association: 'attributes',
                            include: [
                                {
                                    attributes: ['id', 'name', 'price', 'seller_price'],
                                    association: 'attribute_values'
                                }
                            ]
                        }
                    ]
                },
                {
                    association : 'bundle_products'
                }
            ]
        })

        if (!result) {
            return false;
        }

        return result;
    }

    async isProductExist(columnName, columnValue) {
        console.log("ProductsResource@isProductExist");

        if (!columnName || columnName === '' || !columnValue || columnValue === '') {
            throw new Error('columnName & columnValue is required');
        }

        let productsCount = await Product.count({
            where: {
                [columnName]: columnValue
            }
        })

        if (!productsCount || productsCount <= 0) {
            return false;
        }

        return true;
    }

    async getLastInsertedProduct() {
        console.log('CategoryResource@getLastInsertedProduct');
        try {
            let result = await Product.findOne({
                // limit: 1,
                order: [['id', 'DESC']],
                logging: console.log
            });

            return result;
        } catch (err) {
            Error.payload = err.errors ? err.errors : err.message;
            throw new Error();
        }
    }

    async insertMultipleProducts(data) {
        console.log('ProductsResource@insertMultipleProducts');

        if (!data || data === '') {
            throw new Error('data is required');
        }

        try {
            let results = await Product.bulkCreate(data)
            if (!results) {
                return false;
            }

            return results;

        } catch (err) {
            Error.payload = err.errors ? err.errors : err.message;
            throw new Error();
        }

    }

    async deleteAll() {
        console.log('ProductsResource@deleteAll');

        let result = await Product.destroy({ 
            truncate: { cascade: true } 
        });
        
        if (!result) {
            return false;
        }
        return result;
    }

}