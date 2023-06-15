"use strict";
const sequelize = require("sequelize");
const Op = require("sequelize").Op;

const DataHelper = require("../../../helpers/v1/data.helpers");
const _DataHelper = new DataHelper();

const Size = require("./size.model");

module.exports = class SizesResource {
  async getAll(pageNo = null, limit = null) {
    console.log("SizesResource@getAll");

    let whereCondition = {};

    let totalRecords = await Size.count({
      where: whereCondition,
    });

    let pagination = await _DataHelper.pagination(totalRecords, pageNo, limit);

    let results;
    try {
      results = await Size.findAll({
        where: whereCondition,
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
      data: results,
    };

    return resObj;
  }
};
