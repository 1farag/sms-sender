import ErrorResponse from "./ErrorResponse.js";

export default class NotAcceptableResponse extends ErrorResponse {
	constructor(req, err) {
		super([], req);
		this.statusCode = NotAcceptableResponse.STATUS_CODE.NOT_ACCEPTABLE;
		this.message = NotAcceptableResponse.MESSAGES.NOT_ACCEPTABLE;
		if (err && err.message) this.message = err.message;
	}
}