import { AppError } from "../libs/Error.js";
import { catchAsync } from "../middlewares/errorHandler.middleware.js"
import { validationResult } from "express-validator";
import prisma from "../config/prisma.js";
import redis from "../config/redis.js";
import SeatLockService from "./seatLock.service.js";
import crypto from "crypto";
export const addBooking=catchAsync(async(req,res)=>{
    const errors=validationResult(req);
    //console.log(validationResult(req))
    if(!validationResult(req).isEmpty())   throw new AppError(
        errors.array().map(err => err.msg).join(", "),
        400
    );
    //console.log(req.user)
    const userId=req.user.id;
    
    const { showId,showSeatIds }=req.body;
    
    const show=await prisma.show.findUnique({where:{id:showId}})
    if(!show) throw new AppError("Show not  exist",404)

    
    await  SeatLockService.lockSeats(showId, showSeatIds, userId)

  try {
    await prisma.$transaction(async (tx) => {
//console.log(userId)
        const booking = await tx.booking.create({
            
            data: {
                userId:userId,
                bookingTime: new Date(),
                totalAmount: 0,
                status: "PENDING",
                showId
            }
        });
        //console.log("booking done")
        for (const seatId of showSeatIds) {
            const showSeat=await prisma.showSeat.findUnique({
                where: {
                    id: seatId
                }
            });
            //console.log(showSeat)
            if(showSeat.status!=="AVAILABLE") throw new AppError("These Seat is already booked",409)
            await tx.bookingSeat.create({
                data: {
                    bookingId: booking.id,
                    showSeatId: seatId
                }
            });
            await tx.showSeat.update({where:{id:seatId},data:{status:"BOOKED"}})
           

        }
        const preview=await calculateBookingPrice(showId,showSeatIds)
        //console.log(preview)
        await tx.invoice.create({
            data: {
                invoiceNo: generateInvoiceNumber(),
                bookingId: booking.id,
                subTotal:preview.subtotal,
                tax:preview.tax,
                total:preview.total
            }
        });
 //console.log("booking seats done")
      
    });


} catch (err) {

    // Transaction rolled back automatically.
    // Now remove all Redis locks.

    
    //console.log(err)
    throw new AppError(err,409);
}
finally{

    await SeatLockService.unlockSeats(showId, showSeatIds, userId)
}
    
    // console.log(booking)
    return res.status(200).json({success:true,message:"Booking Added Successfully"})

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
export const getBooking=catchAsync(async(req,res)=>{
    const errors=validationResult(req);
    //console.log(validationResult(req))
    if(!validationResult(req).isEmpty())   throw new AppError(
        errors.array().map(err => err.msg).join(", "),
        400
    );
    const {id}=req.params
     const booking=await prisma.booking.findUnique({where:{id},include:{
        bookingSeats:true,
        invoice:true

     }})
     if (!booking) {
    throw new AppError("Booking not found", 404);
}
     return res.status(200).json({success:true,data:booking})
    
})  
export const getMovies=catchAsync(async(req,res)=>{
    const movie=await prisma.movie.findMany()
     return res.status(200).json({success:true,data:movie})
})



export const previewBooking =catchAsync( async (req, res, next) => {
    try {
        const { showId, showSeatIds } = req.body;

        const data=await calculateBookingPrice(showId,showSeatIds)
        return res.status(200).json({
            success:true,
            data:data
        });
    } catch (err) {
        next(err);
    }
});

function generateInvoiceNumber() {
    return `INV-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}



 const calculateBookingPrice = async (showId, showSeatIds) => {

    const show = await prisma.show.findUnique({
        where: { id: showId },
        include: {
            pricings: true,
        },
    });

    if (!show) {
        throw new Error("Show not found");
    }

    const showSeats = await prisma.showSeat.findMany({
        where: {
            id: {
                in: showSeatIds,
            },
            showId,
        },
        include: {
            seat: true,
        },
    });

    if (showSeats.length !== showSeatIds.length) {
        throw new Error("Invalid show seats");
    }

    const pricingMap = new Map();

    show.pricings.forEach((pricing) => {
        pricingMap.set(pricing.seatType, Number(pricing.price));
    });

    let subtotal = 0;

    const seats = showSeats.map((showSeat) => {

        let price = pricingMap.get(showSeat.seat.seatType);

        // Weekend pricing
        const today = new Date().getDay();

        if (today === 0 || today === 6) {
            price *= 1.1;
        }

        // Peak hour pricing
        const hour = new Date(show.startTime).getHours();

        if (hour >= 18 && hour <= 22) {
            price *= 1.2;
        }

        price = Math.round(price);

        subtotal += price;

        return {
            showSeatId: showSeat.id,
            seatNumber: showSeat.seatNumber,
            seatType: showSeat.seat.seatType,
            price,
        };
    });

    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + tax;

    return {
        seats,
        subtotal,
        tax,
        total,
    };
};


export const myBooking=catchAsync(async(req,res)=>{
    console.log(req.user)
    const data=await prisma.booking.findMany({where:{userId:req.user.id}})
    return res.status(200).json({success:true,data:data})
})