import { AppError } from "../libs/Error.js";
import { catchAsync } from "../middlewares/errorHandler.middleware.js"
import { validationResult } from "express-validator";
import prisma from "../config/prisma.js";
export const addSeat=catchAsync(async(req,res)=>{
    const errors=validationResult(req);
    //console.log(validationResult(req))
    if(!validationResult(req).isEmpty())   throw new AppError(
        errors.array().map(err => err.msg).join(", "),
        400
    );

    const {screenId ,seatNumber ,seatType }=req.body;
    const screen =await prisma.screen.findUnique({where:{id:screenId}})
    if(!screen) throw new AppError("Screen Not Present In theatre",404)
    const existing=await prisma.seat.findUnique({where:{screenId_seatNumber: {
        screenId,
        seatNumber
    }}})
      if(existing) throw new AppError("Screen already contains these seat number",404)
     const seat =await prisma.seat.create({data:{screenId ,seatNumber ,seatType}})

    return res.status(200).json({success:true,message:"Seat Added Successfully",data:seat})

})

export const deleteSeat=catchAsync(async(req,res)=>{
    const {id}=req.params;
    const existingSeat=await prisma.seat.findUnique({where:{id:id}})
    if(!existingSeat) throw new AppError("Seat with id doesn't exist",404)
    await prisma.seat.delete({where:{id:id}});

    return res.status(200).json({success:true,message:"Seat deleted Successfully",})
})

export const updateSeat=catchAsync(async(req,res)=>{
    const errors=validationResult(req);
    //console.log(validationResult(req))
    if(!validationResult(req).isEmpty())   throw new AppError(
        errors.array().map(err => err.msg).join(", "),
        400
    );
const {screenId ,seatNumber ,seatType }=req.body;
    const screen =await prisma.screen.findUnique({where:{id:screenId}})
    if(screen) throw new AppError("Screen Not Present In theatre",404)
    const existing=await prisma.seat.findUnique({where:{screenId_seatNumber: {
        screenId,
        seatNumber
    }}})
      if(!existing) throw new AppError("Seat does not exist",404)
     const seat =await prisma.seat.update({where:{id:existing.id},data:{screenId ,seatNumber ,seatType}})
    return res.status(200).json({success:true,message:"Seat Updated Successfully",data:movie})
    
})
export const getSeat=catchAsync(async(req,res)=>{
    const errors=validationResult(req);
    //console.log(validationResult(req))
    if(!validationResult(req).isEmpty())   throw new AppError(
        errors.array().map(err => err.msg).join(", "),
        400
    );
    const {id}=req.params
     const seat=await prisma.seat.findUnique({where:{id}})
     if (!seat) {
    throw new AppError("Movie not found", 404);
}
     return res.status(200).json({success:true,data:seat})
    
})  
export const getSeatByScreen=catchAsync(async(req,res)=>{
    const {id} =req.params
   const exist =await prisma.screen.findUnique({where:{id:id}})
    if(!exist) throw new AppError("Screen not exist",404);
    const seat=await prisma.screen.findUnique({
    where: { id },
    select: {
        screenNumber: true,
        seats: {
        select: {
            id: true,
            seatNumber: true,
            seatType:true
        }
        }
    }
    });
    return res.status(200).json({success:true,data:seat})
})

