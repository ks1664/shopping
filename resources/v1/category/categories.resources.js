'use strict';
const sequelize = require('sequelize');
const Op = require('sequelize').Op;

const DataHelper = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelper();

const SupplyResource = require('./../supplies/supplies.resources');
const _Supply= new SupplyResource();

const Category = require('./category.model');

module.exports = class CategoriesResource {

    async getCategoryByIds(categoryIds) {
        console.log('CategoryResource@getCategoryByIds');

        try {
            let results = await Category.findAll({
                where: {
                    id: {
                        [Op.in]: categoryIds
                    }
                },
                logging: console.log
            });

            return results;
        } catch (err) {
            Error.payload = err.errors ? err.errors : err.message;
            throw new Error();
        }
    }
    
    async createOne(data = null) {
        console.log('CategoriesResource@createOne');

        if (!data || data === '') {
            throw new Error('data is required');
        }

        let result = await Category.create(data);
        if (!result) {
            return false;
        }

        return result;
    }

    async getByColumnNameAndValue(columnName, columnvalue){
        console.log("CategoriesResource@getByColumnNameAndValue")

        let result = await Category.findOne({
            where: {
                [columnName]: columnvalue
            },
            // logging: false
        })

        if(!result){
            return false;
        }

        return result;
    }

    async getByNameAndParentId(name, parent_id){
        console.log("CategoriesResource@getByNameAndParentId")

        let result = await Category.findOne({
            where: {
                name:name,
                parent_id:parent_id
            },
            // logging: false
        })

        if(!result){
            return false;
        }

        return result;
    }

    async getAll(pageNo = null, limit = null, filterObj = {}) {
        console.log('CategoriesResource@getAll',filterObj);

        const { parentId} = filterObj;
        let whereCondition = {};
        
       

        if(parentId && parentId != ''){
            whereCondition.parent_id=parentId;
        }

        let totalRecords = await Category.count({
            where: whereCondition
        });

        let pagination = await _DataHelper.pagination(totalRecords, pageNo, limit);

        let results;
        try {
            results = await Category.findAll({
                where: whereCondition,
                include:[
                    {
                        association:"categories",
                        attributes:['name']
                    }
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

    async insertMultipleCategory(data){
        console.log('CategoryResource@insertMultipleCategory');

        if (!data || data === '') {
            throw new Error('data is required');
        }

        try{
            let results = await Category.bulkCreate(data)
            if (!results) {
                return false;
            }
    
            return results;

        }catch(err){
            Error.payload = err.errors ? err.errors : err.message;
            throw new Error();
        }
    }


    async deleteOne(id) {
        console.log('CategoriesResource@deleteOne');

        let result = await Category.destroy({ 
            where: { id: id } 
        });

        if (!result) {
            return false;
        }

        return result;
    }


    async deleteAll() {
        console.log('CategoriesResource@deleteAll');

        let result = await Category.destroy({ 
            truncate: { cascade: true } 
        });

        if (!result) {
            return false;
        }

        return result;
    }

    async updateOne(id, data) {
        console.log('CategoriesResource@updateOne');
        try {
            await Category.update(data, {
                where: {
                    id: id
                }
            });
        } catch (err) {
            console.log(err.message)
            Error.payload = err.errors ? err.errors : err.message;
            throw new Error();
        }

        return true;
    }
    
}