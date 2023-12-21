import { Op } from "sequelize";

export function campaignFilter (DataOffilter){
    let filter = {};
    if (DataOffilter.campaignName) {
        filter.CampaignName = {
            [Op.like]: `%${DataOffilter.campaignName}%`
        }
    }
    if (DataOffilter.senderName) {
        filter.SenderName = {
            [Op.like]: `%${DataOffilter.senderName}%`
        }
    }
    if (DataOffilter.startDate) {
        filter.createdAt = {
            [Op.gte]: DataOffilter.startDate
        }
    }
    if (DataOffilter.endDate) {
        filter.createdAt = {
            [Op.lte]: DataOffilter.endDate
        }
    }
    if (DataOffilter.startDate && DataOffilter.endDate) {
        filter.createdAt = {
            [Op.between]: [DataOffilter.startDate, DataOffilter.endDate]
        }
    }
    if (DataOffilter.status) {
        filter.status = DataOffilter.status;
    }
    if (DataOffilter.subscriptionId) {
        filter.subscriptionId = DataOffilter.subscriptionId;
    }
    if (DataOffilter.message) {
        filter.message = {
            [Op.like]: `%${DataOffilter.message}%`
        }
    }
    if (DataOffilter.phoneNumbers) {
        filter.phoneNumbers = {
            [Op.like]: `%${DataOffilter.phoneNumbers}%`
        }
    }
    return filter;
}