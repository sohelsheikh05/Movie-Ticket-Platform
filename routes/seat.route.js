import express from "express";
//import {authenticate} from "../middlewares/authenticate.middleware.js"
 import {validateScreen,validateScreenId} from "../middlewares/validators/screen.validator.js"
import { addScreen, deleteScreen, getScreenByTheatreId, getScreens } from "../services/screen.service.js";
import { validateSeat,validateSeatId } from "../middlewares/validators/seat.validator.js";
import { addSeat, deleteSeat, getSeat, getSeatByScreen, updateSeat } from "../services/seat.service.js";





const router=express.Router();

router.post("/seat",validateSeat,addSeat);
router.put("/seat",validateSeat,updateSeat);
// router.get("/movie/:id",validateMovieId,getMovie);
router.get("/seat",getSeat);
router.delete("/seat/:id",validateSeatId,deleteSeat);
router.get("/seats/:id",getSeatByScreen);
export default router;