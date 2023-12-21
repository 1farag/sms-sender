import { Op } from "sequelize";

export function subscriptionFilter(queryData) {
    let filter = {};
    if (queryData.startDate) {
        filter.startDate = {
            [Op.gte]: queryData.startDate
        }
    }
    if (queryData.endDate) {
        filter.endDate = {
            [Op.lte]: queryData.endDate
        }
    }
    if (queryData.status) {
        filter.status = queryData.status;
    }
    return filter;
}