import {Sequelize} from 'sequelize'
import dotenv from "dotenv";
dotenv.config();
const sequelize = new Sequelize(process.env.DB_URL,{
    dialect: "postgres",
	logging: false,
})

const connectDB = async () => {
	try {
		await sequelize.sync({ alter: true });
		console.log("Connection DB");

	} catch (error) {
		return console.log("fail to connect DB", error);
	}
};

export  {connectDB, sequelize};