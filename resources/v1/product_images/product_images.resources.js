'use strict';

const Op = require('sequelize').Op;
const sequelize = require('sequelize');

const DataHelper = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelper();

const ProductImage = require('./product_image.model');

module.exports = class ProductImagesResource {

    async createOne(data = null) {
        console.log('ProductImagesResource@createOne');

        if (!data || data === '') {
            throw new Error('data is required');
        }

        let result = await ProductImage.create(data);
        if (!result) {
            return false;
        }

        return result;
    }

}