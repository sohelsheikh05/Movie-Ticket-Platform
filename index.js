import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";
import { handleError } from "./middlewares/errorHandler.middleware.js";
dotenv.config();
const app=express();
app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;



app.use("/auth",authRoutes);
app.get("/", (req, res) => {
    res.send(`Response from ${PORT}`);
})
app.use(handleError)
app.listen(PORT,()=>{
    console.log("server running on port "+process.env.PORT);
})




