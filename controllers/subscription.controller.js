import { asyncHandler } from "../middleware/errorHandling.js";
import { createSubscription, retrieveSubscriptionById, retrieveSubscriptionsForUser, updateSubscription } from "../services/subscription.services.js";
import CreatedResponse from "../utils/api_response/success/CreatedResponse.js";
import RetrivedResponse from "../utils/api_response/success/RetrivedResponse.js";
import UpdatedResponse from "../utils/api_response/success/UpdatedResponse.js";

export const createSubscriptio_controller = asyncHandler(
    async(req,res)=>{
        const userId = req.user.id;
        const { numSMSs, startDate } = req.body;
        const result = await createSubscription({userId, numSMSs, startDate})
        const response = new CreatedResponse([result],req)
        res.status(response.statusCode).json(response.getResponseJSON());
    }
)
export const getSubscriptionsForUser_controller = asyncHandler(
    async(req,res)=>{
        const userId = req.user.id;
        const result = await retrieveSubscriptionsForUser(userId,req.query)
        const response = new RetrivedResponse(result,req)
        res.status(response.statusCode).json(response.getResponseJSON());
    }
)

export const getSubscriptionById_controller = asyncHandler(
    async(req,res)=>{
        const userId = req.user.id;
        const result = await retrieveSubscriptionById(req.params.subscriptionId,userId)
        const response = new RetrivedResponse([result],req)
        res.status(response.statusCode).json(response.getResponseJSON());
    }
)

export const updateSubscription_controller = asyncHandler(
    async(req,res)=>{
        const {subscriptionId} = req.params;
        const {numSMSs, startDate} = req.body;
        await updateSubscription(subscriptionId,{numSMSs, startDate})
        const response = new UpdatedResponse([],req,`Subscription ${subscriptionId} updated successfully`)
        res.status(response.statusCode).json(response.getResponseJSON());
    }
)

