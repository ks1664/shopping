const _ = require("lodash");
const Joi = require("joi");
const DataHelpers = require("../../../helpers/v1/data.helpers");
const _DataHelper = new DataHelpers();

const ResponseHelper = require("../../../helpers/v1/response.helpers");
const response = new ResponseHelper();

const SizesResource = require("./sizes.resources");
const _Size = new SizesResource();

module.exports = class SizesValidation {
  async getAll(req, res, next) {
    console.log("SizesValidation@getAll");

    let paginateData = await _DataHelper.getPageAndLimit(req.query);
    req.body.page = paginateData.page;
    req.body.limit = paginateData.limit;
    next();
  }
};
