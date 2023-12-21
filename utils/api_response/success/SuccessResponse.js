import APIResponse from "../API_Response.js";

export default class SuccessResponse extends APIResponse {
	constructor(data, req, message) {
		super(SuccessResponse.STATUS_CODE.OK, data, true, req, message);
		this.message = message || SuccessResponse.MESSAGES.SUCCESS;
	}
}