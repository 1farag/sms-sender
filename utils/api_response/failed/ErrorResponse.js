import APIResponse from "../API_Response.js";

export default class ErrorResponse extends APIResponse {
	constructor( req, message) {
		super(ErrorResponse.STATUS_CODE.BAD_REQUEST, [], false, req, message);

		this.statusCode = ErrorResponse.STATUS_CODE.INTERNAL_SERVER_ERROR;
		this.message = ErrorResponse.MESSAGES.INTERNAL_SERVER_ERROR;
		this.size = 0;
	}
}