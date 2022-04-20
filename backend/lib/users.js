const ObjectId = require("mongodb").ObjectID;
const UserRepo = require("../repository/users");

module.exports = class {
  async initialize() {
    this.userRepo = new UserRepo();
  }

  async addUser(data) {
    const result = await this.userRepo.create(data);
    return result;
  }

  async updateUser(query, data) {
    const response = await this.userRepo.updateOne(query, data);
    return response;
  }

  async findUser(input, projection) {
    let result;
    if (projection) result = await this.userRepo.findOne(input, projection);
    else result = await this.userRepo.findOne(input);
    return result;
  }

  async findUsers(query, projection, limit) {
    const result = await this.userRepo.find(query, projection, limit);
    return result;
  }

  async deleteUser(query) {
    const result = await this.userRepo.deleteOne(query);
    return result;
  }
};
