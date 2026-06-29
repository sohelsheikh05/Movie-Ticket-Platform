import { AppError } from "../libs/Error.js";
import { catchAsync } from "../middlewares/errorHandler.middleware.js"
import { validationResult } from "express-validator";
import prisma from "../config/prisma.js";


export const addTheatre=catchAsync(async(req,res)=>{
    const errors=validationResult(req);
    //console.log(validationResult(req))
    if(!validationResult(req).isEmpty())   throw new AppError(
        errors.array().map(err => err.msg).join(", "),
        400
    );

    const {name ,address,city,pincode }=req.body;
    const existing= await prisma.theatre.findUnique({where:{name_address:{          name:name.trim().toLowerCase(),
            address:address.trim().toLowerCase()
    }}})
     
    if(existing) throw new AppError("Theatre with address and name already exist",409);

     const theatre =await prisma.theatre.create({data:{name:name.trim().toLowerCase(),address:address.trim().toLowerCase(),city:city.trim().toLowerCase(),pincode:pincode}})

    return res.status(200).json({success:true,message:"Theatre Added Successfully",data:theatre})

})

export const deleteTheatre=catchAsync(async(req,res)=>{
    const {id}=req.params;
    const existingTheatre=await prisma.theatre.findUnique({where:{id:id}})
    if(!existingMovie) throw new AppError("Theatre with id doesn't exist",404)
    await prisma.theatre.delete({where:{id:id}});

    return res.status(200).json({success:true,message:"Theatre deleted Successfully",})
})

export const updateTheatre=catchAsync(async(req,res)=>{
    const errors=validationResult(req);
    //console.log(validationResult(req))
    if(!validationResult(req).isEmpty())   throw new AppError(
        errors.array().map(err => err.msg).join(", "),
        400
    );

   const {name ,address,city,pincode }=req.body;
    const existing= await prisma.theatre.findUnique({where:{name_address:{          name:name.trim().toLowerCase(),
            address:address.trim().toLowerCase()
    }}})
     
    if(!existing) throw new AppError("Theatre with address and name already not exist",404);

     const theatre =await prisma.theatre.update({where:{id:existing.is},data:{name:name.trim().toLowerCase(),address:address.trim().toLowerCase(),city:city.trim().toLowerCase(),pincode:pincode}})

    return res.status(200).json({success:true,message:"Theatre Updated Successfully",data:movie})
    
})
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
export const getTheatres=catchAsync(async(req,res)=>{
    const theatre=await prisma.theatre.findMany()
     return res.status(200).json({success:true,data:theatre})
})

