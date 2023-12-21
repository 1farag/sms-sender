import responseZodSchema from "./API_Validation.js";
export default class APIResponse {
	static MESSAGES = {
		CREATED: "created successfully",
		UPDATED: "updated successfully",
		DELETED: "deleted successfully",
		RETRIVED: "retrived successfully",
		RESTORED: "restored successfully",
		ADDED: "added successfully",
		SUCCESS: "success",
		FAILED_CREATE: "failed to create",
		FAILED_UPDATE: "failed to update",
		FAILED_DELETE: "failed to delete",
		FAILED_RESTORE: "failed to restore",
		FAILED_ADD: "failed to add",
		FAILED_RETRIVE: "failed to retrive",
		FAILED_SEARCH: "failed to search",
		NOT_FOUND: "not found",
		BAD_REQUEST: "bad request",
		UNAUTHORIZED: "unauthorized",
		CONFILCT: "conflict",
		FORBIDDEN: "forbidden",
		NOT_ACCEPTABLE: "not acceptable",
		INTERNAL_SERVER_ERROR: "internal server error",
	};

	static STATUS_CODE = {
		OK: 200,
		CREATED: 201,
		ACCEPTED: 202,
		BAD_REQUEST: 400,
		UNAUTHORIZED: 401,
		FORBIDDEN: 403,
		NOT_FOUND: 404,
		NOT_ACCEPTABLE: 406,
		CONFLICT: 409,
		INTERNAL_SERVER_ERROR: 500,
	};

	static ACTION_METHODS = {
		DELETE: "deleting",
		POST: "creating",
		PUT: "updating",
		PATCH: "updating",
		GET: "retriving",
	};

	constructor(statusCode, data, success, req, message) {
		let totalPages;
		let normalisedData;
		let page;
		let size;

		
		if (req.query) {
			page = parseInt(req.query.page);
			size = parseInt(req.query.size);
		}
		
		if (Array.isArray(data)) {
			normalisedData = data.map((item) => {
				const values = item.token ? { ...item } : { ...item.get() };
				if (values.password) delete values.password;
				return values;
			});
		} else {
			totalPages = Math.ceil(data.count / (size ? parseInt(size) : 5));
			console.log(data);
			normalisedData = data.rows.map((item) => ({ ...item.get() }));
		}

		
		if (!(req.httpMethod === "GET") || normalisedData.length == 1) {
			page = 1;
			size = 1;
		}


		this.statusCode = statusCode;
		this.data = normalisedData;
		this.totalPages = totalPages || 1;
		this.success = success;
		this.action = APIResponse.ACTION_METHODS[req.method];
		this.httpMethod = `${req.method}`;
		this.req = req;
		this.page =  page || 1;
		this.size =  size || 5;
		if (message) this.message = message;
	}

	getResponseJSON() {
		return responseZodSchema.parse(this);
	}
}