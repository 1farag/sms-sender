import UserRepository from "../repositories/user.repository.js";
import { NotAcceptableError, NotFoundError } from "../utils/errors.js";

export const register = async ( username, password ) => {
    try {
        const user = await UserRepository.createUser(username, password );
        const token = user.generateToken();
        return { user, token };
    } catch (error) {
        throw new Error(`Failed to create ${error.message}` )
    }
};

export const login = async ( username, password ) => {
    try {
        const user = await UserRepository.getUserByUsername(username);
        if (!user) throw new NotFoundError("User not found");
        const isMatch = await user.comparePasswords(password);
        if (!isMatch) throw new NotAcceptableError("Incorrect password");
        const token = user.generateToken();
        return { user, token };
    } catch (error) {
        throw new Error(`Failed to login ${error.message}` )
    }
}
