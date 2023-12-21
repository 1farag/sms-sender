import { ValidationError } from "sequelize";
import BadReqResponse from "../utils/api_response/failed/BadReqResponse.js";
import ErrorResponse from "../utils/api_response/failed/ErrorResponse.js";
import NotAcceptableResponse from "../utils/api_response/failed/NotAcceptableResponse.js";
import NotFoundResponse from "../utils/api_response/failed/NotFoundResponse.js";
import UnauthorizedResponse from "../utils/api_response/failed/UnauthorizedResponse.js";
import { BadRequestError, NotAcceptableError, NotFoundError, UnauthorizedError } from "../utils/errors.js";

export const asyncHandler = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch((err) => {
			next(err);
		});
	};
};

export const globalErrorHandling = (err, req, res, next) => {
    let response;
    if (err instanceof NotFoundError) response = new NotFoundResponse (req, err);
    else if (err instanceof BadRequestError || err instanceof ValidationError  ) response = new BadReqResponse (req, err);
    else if (err instanceof UnauthorizedError || err.name == "JsonWebTokenError" ||err.name == "TokenExpiredError") response = new UnauthorizedResponse(req, err);
    else if (err instanceof NotAcceptableError) response = new NotAcceptableResponse(req, err);
    else   response = new ErrorResponse(req, err);

    res.status(response.statusCode).json(response.getResponseJSON()); 
    console.log(err);
}
