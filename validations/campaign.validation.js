import {z} from "zod";

export const campaignSchema = z.object({
    body: z.object({
        senderName: z.string({
            required_error: "Sender name is required"
        }),
        campaignName: z.string({
            required_error: "Campaign name is required"
        }),
        message: z.string({
            required_error: "Message is required"
        }),
        phoneNumbers: z.array(z.string()).nonempty({
            message: "Phone numbers are required"
        }).refine((val) => {
            return val.length === new Set(val).size
        }, {
            message: "Phone numbers must be unique"
        })
    })
    })


export const updateCampaignStatusSchema = z.object({
    body: z.object({
        status: z.enum(["pending", "sent", "failed"])
    }),
    params: z.object({
        campaignId: z.string({
            required_error: "Campaign Id is required"
        })
    })
})

export const getCampaignByIdSchema = z.object({
    params: z.object({
        campaignId: z.string({
            required_error: "Campaign Id is required"
        })
    })
})

export const getCampaignsForUserSchema = z.object({
    query: z.object({
        page: z.string({
            required_error: "Page is required"
        }),
        limit: z.string({
            required_error: "Limit is required",
        }),
        startDate: z.date({
            required_error: "Start date is required"
        }),
        endDate: z.date({
            required_error: "End date is required"
        }),
        status: z.enum(["pending", "sent", "failed"]).optional()
    })
})


