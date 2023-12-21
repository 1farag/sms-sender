import User from "../models/user.model.js";
import { BadRequestError, NotFoundError } from "../utils/errors.js";

class UserRepository {
    // Create a new user
    static async createUser(username,password) {
      try {
        const createdUser = await User.create({
          username,
          password,
        });
        return createdUser;
      } catch (error) {
        throw new BadRequestError(`Error creating user: ${error.message}`)
      }
    }
  
    // Get user by ID
    static async getUserById(userId) {
      try {
        const user = await User.findByPk(userId);
        if (!user) throw new NotFoundError("user not found")
        return user;
      } catch (error) {
        throw new Error(`Error retrieving user: ${error.message}`);
      }
    }
  
    // Get user by username
    static async getUserByUsername(username) {
      try {
        const user = await User.findOne({ where: { username } });
        if (!user) throw new NotFoundError("user not found")
        return user;
      } catch (error) {
        throw new Error(`Error retrieving user by username: ${error.message}`);
      }
    }
  }

    export default UserRepository;