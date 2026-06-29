import { AppError } from "../libs/Error.js";
import { catchAsync } from "../middlewares/errorHandler.middleware.js"
import { validationResult } from "express-validator";
import prisma from "../config/prisma.js";
export const addScreen=catchAsync(async(req,res)=>{
    const errors=validationResult(req);
    //console.log(validationResult(req))
    if(!validationResult(req).isEmpty())   throw new AppError(
        errors.array().map(err => err.msg).join(", "),
        400
    );

    const {screenNumber ,theatreId }=req.body;
    const theatre=await prisma.theatre.findUnique({where:{id:theatreId}})
    if(!theatre)throw new AppError("Theatre not found ",404)
    const existing=await prisma.screen.findUnique({where:{theatreId_screenNumber: {
        screenNumber,
        theatreId
    }}})
      if(existing) throw new AppError("Theatre already contains these screen No",404)
     const screen =await prisma.screen.create({data:{screenNumber,
        theatreId}})

    return res.status(200).json({success:true,message:"Screen Added Successfully",data:screen})

})

export const deleteScreen=catchAsync(async(req,res)=>{
    const {id}=req.params;
    const existingScreen=await prisma.screen.findUnique({where:{id:id}})
    if(!existingScreen) throw new AppError("Screen with id doesn't exist",404)
    await prisma.screen.delete({where:{id:id}});

    return res.status(200).json({success:true,message:"Screen deleted Successfully",})
})

// export const updateMovie=catchAsync(async(req,res)=>{
//     const errors=validationResult(req);
//     //console.log(validationResult(req))
//     if(!validationResult(req).isEmpty())   throw new AppError(
//         errors.array().map(err => err.msg).join(", "),
//         400
//     );

//     const {name ,releaseDate ,rating ,cast  ,director ,producer ,durationMinutes,language }=req.body;
//     const existing=await prisma.movie.findUnique({where:{name_language: {
//       name:name.trim().toLowerCase(),
//       language:language.trim().toLowerCase()
//     }}})
//       if(!existing) throw new AppError("Movie with name and languag doesn't exist",404)
//      const movie =await prisma.movie.update({where:{id:existing.id},data:{releaseDate:new Date(req.body.releaseDate)
//   ,rating,cast,director,producer,durationMinutes}})

//     return res.status(200).json({success:true,message:"Movie Updated Successfully",data:movie})
    
// })
// export const getMovie=catchAsync(async(req,res)=>{
//     const errors=validationResult(req);
//     //console.log(validationResult(req))
//     if(!validationResult(req).isEmpty())   throw new AppError(
//         errors.array().map(err => err.msg).join(", "),
//         400
//     );
//     const {id}=req.params
//      const movie=await prisma.movie.findUnique({where:{id}})
//      if (!movie) {
//     throw new AppError("Movie not found", 404);
// }
//      return res.status(200).json({success:true,data:movie})
    
// })
export const getScreens=catchAsync(async(req,res)=>{
    const screen=await prisma.screen.findMany()
    return res.status(200).json({success:true,data:screen})
})

export const getScreenByTheatreId=catchAsync(async(req,res)=>{
    const {id}=req.params
    const exist =await prisma.theatre.findUnique({where:{id:id}})
    if(!exist) throw new AppError("Theatre not exist",404);
const screen=await prisma.theatre.findUnique({
  where: { id },
  select: {
    name: true,
    address: true,
    screens: {
      select: {
        id: true,
        screenNumber: true
      }
    }
  }
});
    return res.status(200).json({success:true,data:screen})
})
