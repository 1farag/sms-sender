import SuccessResponse from "./SuccessResponse.js";

export default class DeletedResponse extends SuccessResponse {
	constructor(data, req, message) {
		super(data, req, message);
		this.statusCode = DeletedResponse.STATUS_CODE.OK;
		this.message = message || DeletedResponse.MESSAGES.DELETED;
	}
}