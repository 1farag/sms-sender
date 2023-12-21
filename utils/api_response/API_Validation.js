import { z } from "zod";

const responseZodSchema = z
	.object({
		success: z.boolean(),
		httpMethod: z.string(),
		statusCode: z.number(),
		data: z.object({}).catchall(z.any()).array(),
		message: z.string(),
		totalPages: z.number().optional(),
		page: z.number().optional(),
		size: z.number().optional(),
		errors: z.object({}).catchall(z.string()).optional(),
	})
	.strip();

export default responseZodSchema;