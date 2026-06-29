import express from "express";
import cors from "cors";
import http from "http"
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";
import { handleError } from "./middlewares/errorHandler.middleware.js";
import movieRoutes from "./routes/movie.routes.js"
import theatreRoutes from "./routes/theatre.routes.js"
import screenRoutes from "./routes/screen.routes.js"
import seatRoutes from "./routes/seat.route.js"
import searchService from"./services/search.service.js"
import showRoutes from"./routes/show.routes.js"
import bookingRoutes from"./routes/booking.routes.js"
import { initSocket } from "./config/socket.js";
dotenv.config();
const app=express();
app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(cookieParser());
const server = http.createServer(app);

initSocket(server);
const PORT = process.env.PORT || 3000;


app.use("/search",searchService)
app.use("/auth",authRoutes);
app.use("/m",movieRoutes)
app.use("/t",theatreRoutes)
app.use("/s",screenRoutes)
app.use("/st",seatRoutes)
app.use("/sh",showRoutes)
app.use("/b",bookingRoutes)
app.get("/", (req, res) => {
    res.send(`Response from ${PORT}`);
})
app.use(handleError)
server.listen(PORT,()=>{
    console.log("server running on port "+process.env.PORT);
})




