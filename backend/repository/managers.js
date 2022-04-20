const managersModel = require("../models/managers");

module.exports = class managers {
  async create(doc) {
    return managersModel.create(doc);
  }

  async find(query, projection = {}, limit = Number.MAX_SAFE_INTEGER) {
    return managersModel.find(query).limit(limit).select(projection);
  }

  async updateOne(query, doc) {
    return managersModel.updateOne(query, doc);
  }

  async getEmployees(query) {
    return managersModel.find(query).populate("employed");
  }
};
