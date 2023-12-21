import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { createCampaign_Controller, getCampaignById_Controller, getCampaignsForUser_controller, updateCampaignStatus_controller } from "../controllers/campaign.controller.js";
import { validateRequest } from "../middleware/validation.js";
import { campaignSchema, getCampaignByIdSchema, getCampaignsForUserSchema, updateCampaignStatusSchema } from "../validations/campaign.validation.js";

const router = Router();


router.route("/")
    .post(auth,validateRequest(campaignSchema), createCampaign_Controller)
    .get(auth,validateRequest(getCampaignsForUserSchema), getCampaignsForUser_controller)

router.route("/:campaignId")
    .get(auth, validateRequest(getCampaignByIdSchema), getCampaignById_Controller)
    .patch(auth,validateRequest(updateCampaignStatusSchema), updateCampaignStatus_controller)

 export default router