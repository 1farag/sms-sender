import SuccessResponse from "./SuccessResponse.js";

export default class RetrivedResponse extends SuccessResponse {
	constructor(data, req, message) {
		super(data, req, message);
		this.message = message || RetrivedResponse.MESSAGES.RETRIVED;
	}
}