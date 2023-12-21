import ErrorResponse from "./ErrorResponse.js";

export default class NotFoundResponse extends ErrorResponse
 {
	constructor(req, err) {
		super([], req);
		this.statusCode = NotFoundResponse.STATUS_CODE.NOT_FOUND;
		this.message = NotFoundResponse.MESSAGES.NOT_FOUND;
		if (err && err.message) this.message = err.message;
	}
}