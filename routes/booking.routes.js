import express from "express";
import {authenticate} from "../middlewares/authenticate.middleware.js"
import { addBooking, getBooking, myBooking, previewBooking } from "../services/booking.service.js";
import { validateBooking, validateBookingId } from "../middlewares/validators/booking.validator.js";




const router=express.Router();

router.post("/booking",authenticate,validateBooking,addBooking);
router.post("/booking/preview",authenticate,validateBooking,previewBooking);
 router.get("/bookings",authenticate,myBooking);
 router.get("/booking/:id",authenticate,getBooking);
// router.get("/movies",validateMovie,getMovies);
// router.delete("/movie/:id",validateMovieId,deleteMovie);

export default router;