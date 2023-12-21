import Campaigns from "../models/campaigns.model.js";
import { BadRequestError, NotFoundError } from "../utils/errors.js";

class CampaignRepository {
  // Create a new campaign
  static async createCampaign(campaignData) {
    try {
      const createdCampaign = await Campaigns.create(campaignData)
      return createdCampaign;
    } catch (error) {
      throw new BadRequestError(`Error creating campaign: ${error.message}`)
    }
  }

  // Retrieve campaign data
  static async getCampaignById(campaignId, userId) {
    try {
      const campaign = await Campaigns.findOne({
        where: {id: campaignId, userId:  userId },
      });
      if (!campaign) throw NotFoundError("Campaigns not found")
      return campaign;
    } catch (error) {
      throw new Error(`Error creating campaign: ${error.message}`)
    }
  }

  // Update campaign status
  static async updateCampaignStatus(campaignId, newStatus) {
    try {
      const [updatedRows] = await Campaigns.update({ status: newStatus }, {
        where: { campaignId },
      });
      return updatedRows > 0;
    } catch (error) {
      throw new BadRequestError(`Error updating campaign status: ${error.message}`);
    }
  }


}

export default CampaignRepository;