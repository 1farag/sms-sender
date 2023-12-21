import z from "zod";
export const subscriptionSchema = z.object({
    body: z.object({
        numSMSs: z.number({
            required_error: "Number of SMSs is required"
        }),
        startDate: z.date({
            required_error: "Start date is required"
        })
    })
})


export const updateSubscriptionSchema = z.object({
    body: z.object({
        numSMSs: z.number().optional(),
        startDate: z.date().optional()
    }),
    params: z.object({
        subscriptionId: z.string({
            required_error: "Subscription Id is required"
        })
    })
})

export const getSubscriptionByIdSchema = z.object({
    params: z.object({
        subscriptionId: z.string({
            required_error: "Subscription Id is required"
        })
    })
})

export const getSubscriptionsForUserSchema = z.object({
    query: z.object({
        page: z.string({
            required_error: "Page is required"
        }),
        limit: z.string({
            required_error: "Limit is required"
        }),
        startDate: z.date({
            required_error: "Start date is required"
        }),
        endDate: z.date({
            required_error: "End date is required"
        })
    })
})
