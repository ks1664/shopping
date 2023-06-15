const _ = require("lodash");

const ResponseHelper = require("../../../helpers/v1/response.helpers");
const response = new ResponseHelper();

const DataHelper = require("../../../helpers/v1/data.helpers");
const _DataHelper = new DataHelper();

const SizesResource = require("./sizes.resources");
const _Size = new SizesResource();

module.exports = class SizesController {
  async getAll(req, res) {
    console.log("SizesController@getAll");

    let data = _.pick(req.body, ["page", "limit"]);

    let results = await _Size.getAll(data.page, data.limit);
    if (!results) {
      return response.notFound("No sizes found", res, false);
    }

    return response.success("Sizes found", res, results);
  }
};
