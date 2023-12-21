import { asyncHandler } from "../middleware/errorHandling.js";
import { createCampaign, retrievCampaignsForUser, retrieveCampaignById } from "../services/campaign.services.js";
import CreatedResponse from "../utils/api_response/success/CreatedResponse.js";
import RetrivedResponse from "../utils/api_response/success/RetrivedResponse.js";
import UpdatedResponse from "../utils/api_response/success/UpdatedResponse.js";

export const createCampaign_Controller = asyncHandler(
    async (req,res) =>{
        const { senderName, campaignName, message, phoneNumbers} = req.body;
        const userId = req.user.id;
        const result = await createCampaign({ senderName, campaignName, message, phoneNumbers, userId})
        const response = new CreatedResponse([result],req)
        res.status(response.statusCode).json(response.getResponseJSON());
    }
)


export const getCampaignsForUser_controller = asyncHandler(
    async(req,res)=>{
        const userId = req.user.id;
        const result = await retrievCampaignsForUser(userId,req.query)
        const response = new RetrivedResponse(result,req)
        res.status(response.statusCode).json(response.getResponseJSON());
    }
)


export const getCampaignById_Controller = asyncHandler(
    async(req,res)=>{
        const {campaignId} = req.params;
        const userId = req.user.id;
        const result = await retrieveCampaignById(campaignId,userId)
        const response = new RetrivedResponse([result],req)
        res.status(response.statusCode).json(response.getResponseJSON());
    }
)

export const updateCampaignStatus_controller = asyncHandler(
    async(req,res)=>{
        const {campaignId} = req.params;
        const {status} = req.body;
        const result = await updateCampaignStatus(campaignId,status)
        const response = new UpdatedResponse([result],req)
        res.status(response.statusCode).json(response.getResponseJSON());
    }
)