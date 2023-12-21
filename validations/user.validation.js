import { z } from "zod";


export const userSchema = z.object({
    body: z.object({
        username: z.string({
            required_error: "Username is required"
        }),
        password: z.string({
            required_error: "Password is required"
        }).min(6, "Password must be at least 6 characters long")
    })
})


