const ObjectId = require("mongodb").ObjectID;
const ManagerRepo = require("../repository/managers");

module.exports = class {
  async initialize() {
    this.ManagerRepo = new ManagerRepo();
  }

  async addUser(data) {
    const result = await this.ManagerRepo.create(data);
    return result;
  }

  async findUsers(query, projection, limit) {
    const result = await this.ManagerRepo.find(query, projection, limit);
    return result;
  }

  async updateUser(query, data) {
    const response = await this.ManagerRepo.updateOne(query, { $push: data });
    return response;
  }

  async getEmloyees(query) {
    const response = await this.ManagerRepo.getEmployees(query);
    return response;
  }
};
