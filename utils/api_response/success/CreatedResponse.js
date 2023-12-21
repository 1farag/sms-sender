import SuccessResponse from "./SuccessResponse.js";

export default class CreatedResponse extends SuccessResponse {
	constructor(data, req, message) {
		super(data, req, message);
		this.statusCode = CreatedResponse.STATUS_CODE.CREATED;
		this.message = message || CreatedResponse.MESSAGES.CREATED;
	}
}

