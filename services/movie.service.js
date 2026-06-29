import { AppError } from "../libs/Error.js";
import { catchAsync } from "../middlewares/errorHandler.middleware.js"
import { validationResult } from "express-validator";
import prisma from "../config/prisma.js";
export const addMovie=catchAsync(async(req,res)=>{
    const errors=validationResult(req);
    //console.log(validationResult(req))
    if(!validationResult(req).isEmpty())   throw new AppError(
        errors.array().map(err => err.msg).join(", "),
        400
    );

    const {name ,releaseDate ,rating ,cast  ,director ,producer ,durationMinutes,language }=req.body;
    
    const existing=await prisma.movie.findUnique({where:{name_language: {
        name:name.trim().toLowerCase(),
        language:language.trim().toLowerCase() 
    }}})
      if(existing) throw new AppError("Movie with name and language Already exist",404)
     const movie =await prisma.movie.create({data:{name:name.trim().toLowerCase(),releaseDate:new Date(req.body.releaseDate)
  ,rating,cast,director,producer,durationMinutes,language:language.trim().toLowerCase()}})

    return res.status(200).json({success:true,message:"Movie Added Successfully",data:movie})

})

export const deleteMovie=catchAsync(async(req,res)=>{
    const {id}=req.params;
    const existingMovie=await prisma.movie.findUnique({where:{id:id}})
    if(!existingMovie) throw new AppError("Movie with id doesn't exist",404)
    await prisma.movie.delete({where:{id:id}});

    return res.status(200).json({success:true,message:"Movie deleted Successfully",})
})

export const updateMovie=catchAsync(async(req,res)=>{
    const errors=validationResult(req);
    //console.log(validationResult(req))
    if(!validationResult(req).isEmpty())   throw new AppError(
        errors.array().map(err => err.msg).join(", "),
        400
    );

    const {name ,releaseDate ,rating ,cast  ,director ,producer ,durationMinutes,language }=req.body;
    const existing=await prisma.movie.findUnique({where:{name_language: {
      name:name.trim().toLowerCase(),
      language:language.trim().toLowerCase()
    }}})
      if(!existing) throw new AppError("Movie with name and languag doesn't exist",404)
     const movie =await prisma.movie.update({where:{id:existing.id},data:{releaseDate:new Date(req.body.releaseDate)
  ,rating,cast,director,producer,durationMinutes}})

    return res.status(200).json({success:true,message:"Movie Updated Successfully",data:movie})
    
})
export const getMovie=catchAsync(async(req,res)=>{
    const errors=validationResult(req);
    //console.log(validationResult(req))
    if(!validationResult(req).isEmpty())   throw new AppError(
        errors.array().map(err => err.msg).join(", "),
        400
    );
    const {id}=req.params
     const movie=await prisma.movie.findUnique({where:{id}})
     if (!movie) {
    throw new AppError("Movie not found", 404);
}
     return res.status(200).json({success:true,data:movie})
    
})  
export const getMovies=catchAsync(async(req,res)=>{
    const movie=await prisma.movie.findMany()
     return res.status(200).json({success:true,data:movie})
})

