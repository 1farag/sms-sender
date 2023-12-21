import ErrorResponse from "./ErrorResponse.js";

export default class UnauthorizedResponse extends ErrorResponse {
	constructor(req, err) {
		super([], req);
		this.statusCode = UnauthorizedResponse.STATUS_CODE.UNAUTHORIZED;
		this.message = UnauthorizedResponse.MESSAGES.UNAUTHORIZED;
		if (err && err.message) this.message = err.message;
	}
}