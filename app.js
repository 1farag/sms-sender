import express from "express";
import dotenv from "dotenv";
dotenv.config();
import {connectDB} from "./config/db-config.js";
import { globalErrorHandling } from "./middleware/errorHandling.js";
import indexRouter from "./routes/index.route.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB();
app.use("/api/v1",indexRouter);

app.use(globalErrorHandling);


app.listen(3000, () => {
    console.log("Server running on port 3000");
});
