import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { UnauthorizedError } from "../utils/errors.js";
import { asyncHandler } from "./errorHandling.js";
import dotenv from "dotenv";
dotenv.config();

export const auth = asyncHandler(async (req, res, next) => {
	try {
		let token;

		if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
			token = req.headers.authorization.split(" ")[1];
		}

		if (!token) {
			throw new UnauthorizedError("Invalid token");
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findOne({
			where: {
				id: decoded.id,
			},
		});


		if (!user) {
			throw new UnauthorizedError("Invalid token");
		}

		req.user = user;
		return next();
	} catch (error) {
		next(new UnauthorizedError())
	}
	
});