import { userModel } from "./models/userModel.js";

export default class UserDaoMongoDB {


  async getByEmail(email) {
    try {
      const response = await userModel.find({ email: email });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const response = await userModel.findById(id).populate("cart");
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(page = 1, limit = 10) {
    try {
      const response = await userModel.paginate({}, { page, limit });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async create(obj) {
    try {
      const response = await userModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, obj) {
    try {
      await userModel.updateOne({ _id: id }, obj);
      return obj;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const response = await userModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
