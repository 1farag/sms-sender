import { ValidationError } from "../utils/errors.js";

export function validateRequest(schema) {
	return async function (req, res, next) {
		try {
			const { body, params, query } = req;

			const validValues = await schema.parseAsync({
				body,
				query,
				params,
			});

			req.body = validValues.body;
			req.query = validValues.query;
			req.params = validValues.params;
		} catch (err) {
			next(new ValidationError(err.message));
		}

		return next();
	};
}