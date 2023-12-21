import { sequelize } from "../config/db-config.js";
import Subscriptions from "./subscription.model.js";
import User from "./user.model.js";
import { DataTypes } from "sequelize";

const Campaigns = sequelize.define("campaigns", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    senderName: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    campaignName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumbers: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
    },
    subscriptionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Subscriptions,
            key: "id",
        },
        status: {
            type: DataTypes.ENUM("pending", "sent", "failed"),
            defaultValue: "pending",
            allowNull: false,
        },
    },
});

export default Campaigns;