import { sequelize } from "../config/db-config.js";
import User from "./user.model.js";
import { DataTypes } from "sequelize";

const Subscriptions = sequelize.define("subscriptions", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
    },
    numSMSs: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sentSMSsNum: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    endDate: {
         type: DataTypes.DATE,
         allowNull: false,
         defaultValue: DataTypes.NOW,
     },
});

export default Subscriptions;