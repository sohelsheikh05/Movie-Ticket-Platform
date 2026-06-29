import express from "express";
//import {authenticate} from "../middlewares/authenticate.middleware.js"
 import {validateScreen,validateScreenId} from "../middlewares/validators/screen.validator.js"
import { addScreen, deleteScreen, getScreenByTheatreId, getScreens } from "../services/screen.service.js";





const router=express.Router();

router.post("/screen",validateScreen,addScreen);
// router.put("/movie",validateMovie,updateMovie);
// router.get("/movie/:id",validateMovieId,getMovie);
router.get("/screens",getScreens);
router.delete("/screen/:id",validateScreenId,deleteScreen);
router.get("/screens/:id",getScreenByTheatreId);
export default router;