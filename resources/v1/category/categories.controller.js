const _ = require("lodash");

const XLSX = require("xlsx");

const ResponseHelper = require("../../../helpers/v1/response.helpers");
const response = new ResponseHelper();

const DataHelper = require("../../../helpers/v1/data.helpers");
const _DataHelper = new DataHelper();

const CategoriesResource = require("./categories.resources");
const _Category = new CategoriesResource();

module.exports = class CategoriesController {
  async createOne(req, res) {
    console.log("CategoriesController@createOne");
    let data = _.pick(req.body, ["name", "description", "slug", "parent_id"]);

    data.category_uuid = await _DataHelper.generateUuid();
    let result = await _Category.createOne(data);
    if (!result) {
      return response.exception("Unable to create new category!", res, false);
    }

    return response.created("Category created successfully", res, result);
  }

  async updateOne(req, res) {
    console.log("CategoriesController@updateOne");
    let data = _.pick(req.body, ["name", "description", "slug", "parent_id"]);
    let id = req.params.id;
    let result = await _Category.getByColumnNameAndValue("id", id);
    if (!result) {
      return response.notFound("not_found", res, false);
    }
    result = await _Category.updateOne(id, data);
    if (!result) {
      return response.exception("Unable to update new category!", res, false);
    }

    return response.created("Category updated successfully", res, result);
  }

  async getAll(req, res) {
    console.log("CategoriesController@getAll");

    let data = _.pick(req.body, ["page", "limit", "category_id"]);

    const filterObj = {
      parentId: data.category_id,
    };
    let results = await _Category.getAll(data.page, data.limit, filterObj);
    if (!results) {
      return response.notFound("No categories found", res, false);
    }

    return response.success("Categories found", res, results);
  }

  async getOne(req, res) {
    console.log("CategoriesController@getOne");

    let result = await _Category.getByColumnNameAndValue("id", req.params.id);
    if (!result) {
      return response.notFound("not_found", res, false);
    }

    return response.success("success", res, result);
  }

  async deleteOne(req, res) {
    console.log("CategoriesController@deleteOne");

    let result = await _Category.getByColumnNameAndValue("id", req.params.id);
    if (!result) {
      return response.notFound("not_found", res, false);
    }
    result = await _Category.deleteOne(req.params.id);

    return response.success("Deleted success", res, result);
  }

  async managecategory(req, res) {
    console.log("CategoriesController@managecategory");
    res.render("admin/category");
  }
};
