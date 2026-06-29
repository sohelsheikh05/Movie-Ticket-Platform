import express from "express";
import {authenticate} from "../middlewares/authenticate.middleware.js"
import {validateMovie,validateMovieId} from "../middlewares/validators/movie.validator.js"
import {addMovie ,updateMovie,deleteMovie,getMovies,getMovie} from "../services/movie.service.js"




const router=express.Router();

router.post("/movie",validateMovie,addMovie);
router.put("/movie",validateMovie,updateMovie);
router.get("/movie/:id",validateMovieId,getMovie);
router.get("/movies",validateMovie,getMovies);
router.delete("/movie/:id",validateMovieId,deleteMovie);

export default router;