import express from "express";
//import {authenticate} from "../middlewares/authenticate.middleware.js"
 import {validateTheatre,validateTheatreId} from "../middlewares/validators/theatre.validator.js"
import { addTheatre, deleteTheatre, getTheatres, updateTheatre } from "../services/theatre.service.js";




const router=express.Router();

router.post("/theatre",validateTheatre,addTheatre);
router.put("/movie",validateTheatre,updateTheatre);
// router.get("/movie/:id",validateMovieId,getMovie);
router.get("/theatres",getTheatres);
router.delete("/theatre/:id",validateTheatreId,deleteTheatre);

export default router;