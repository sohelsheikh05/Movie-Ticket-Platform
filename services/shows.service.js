import { AppError } from "../libs/Error.js";
import { catchAsync } from "../middlewares/errorHandler.middleware.js"
import { validationResult } from "express-validator";
import prisma from "../config/prisma.js";
//import { addShowSeat } from "./showSeat.service.js";
export const addShow = catchAsync(async (req, res) => {
       const errors=validationResult(req);
    //console.log(validationResult(req))
    if(!validationResult(req).isEmpty())   throw new AppError(
        errors.array().map(err => err.msg).join(", "),
        400
    );
const {
        movieId,
        theatreId,
        screenId,
        startTime,
        endTime,
        priceStandard,
    pricePremium,
    priceBalcony
    } = req.body;

    if (new Date(startTime).getTime() <= Date.now()) {
    throw new AppError("Show schedule must be in the future", 400);
    }

    const movie = await prisma.movie.findUnique({
        where: { id: movieId }
    });

    if (!movie) {
        throw new AppError("Movie not found", 404);
    }

    const screen = await prisma.screen.findUnique({
        where: {
            id:screenId
        },
        include:{
            seats:true
        }
    });

    if (!screen) {
        throw new AppError("Screen not found", 404);
    }
const overlappingShow = await prisma.show.findFirst({
        where: {
            screenId: screen.id,

            startTime: {
                lte: new Date(endTime)
            },

            endTime: {
                gte: new Date(startTime)
            }
        }
    });
    //console.log(overlappingShow)

    if (overlappingShow) {
        throw new AppError(
            "Another show is already scheduled during this time on the same screen",
            409
        );
    }
    const show=await prisma.$transaction(async(tx)=>{
        const show = await tx.show.create({
            data: {
                movieId,
                screenId: screen.id,
                startTime: new Date(startTime),
                endTime: new Date(endTime)
            }
        });
        //console.log()
        if (screen.seats.length === 0) {
            throw new AppError("No seats found for this screen", 404);
        }

        for(const seat of screen.seats){
            await tx.showSeat.create({data:{showId:show.id,seatId:seat.id}})
        }
        
            await tx.showSeatPricing.create({data:{showId:show.id,seatType:"STANDARD",price:priceStandard}})
            await tx.showSeatPricing.create({data:{showId:show.id,seatType:"PREMIUM",price:pricePremium}})
            await tx.showSeatPricing.create({data:{showId:show.id,seatType:"BALCONY",price:priceBalcony}})
        
        return show
    })
    return res.status(201).json({
        success: true,
        message: "Show created successfully",
        data: show
    });
});
export const deleteShow = catchAsync(async (req, res) => {
   const errors=validationResult(req);
    //console.log(validationResult(req))
    if(!validationResult(req).isEmpty())   throw new AppError(
        errors.array().map(err => err.msg).join(", "),
        400
    );
    const { id } = req.params;

    const existing = await prisma.show.findUnique({
        where: { id }
    });

    if (!existing) {
        throw new AppError("Show not found", 404);
    }

    await prisma.show.delete({
        where: { id }
    });

    return res.status(200).json({
        success: true,
        message: "Show deleted successfully"
    });
});

export const updateShow = catchAsync(async (req, res) => {
       const errors=validationResult(req);
    //console.log(validationResult(req))
    if(!validationResult(req).isEmpty())   throw new AppError(
        errors.array().map(err => err.msg).join(", "),
        400
    );
    const { id } = req.params;

    const existing = await prisma.show.findUnique({
        where: { id }
    });

    if (!existing) {
        throw new AppError("Show not found", 404);
    }

    const {
        movieId,
        theatreId,
        screenNumber,
        startTime,
        endTime
    } = req.body;

    const screen = await prisma.screen.findUnique({
        where: {
            theatreId_screenNumber: {
                theatreId,
                screenNumber
            }
        }
    });

    if (!screen) {
        throw new AppError("Screen not found", 404);
    }

    const show = await prisma.show.update({
        where: { id },
        data: {
            movieId,
            screenId: screen.id,
            startTime: new Date(startTime),
            endTime: new Date(endTime)
        }
    });

    return res.status(200).json({
        success: true,
        message: "Show updated successfully",
        data: show
    });
});
export const getShow = catchAsync(async (req, res) => {
       const errors=validationResult(req);
    //console.log(validationResult(req))
    if(!validationResult(req).isEmpty())   throw new AppError(
        errors.array().map(err => err.msg).join(", "),
        400
    );
    const { id } = req.params;

    const show = await prisma.show.findUnique({
        where: { id },
        include: {
            movie: true,
            screen: {
                include: {
                    theatre: true
                }
            }
        }
    });

    if (!show) {
        throw new AppError("Show not found", 404);
    }

    return res.status(200).json({
        success: true,
        data: show
    });
});  

export const getShows = catchAsync(async (req, res) => {

    const shows = await prisma.show.findMany({
        include: {
            movie: true,
            screen: {
                include: {
                    theatre: true
                }
            }
        }
    });

    return res.status(200).json({
        success: true,
        data: shows
    });
});



export const getShowSeats = catchAsync(async (req, res) => {
       const errors=validationResult(req);
    //console.log(validationResult(req))
    if(!validationResult(req).isEmpty())   throw new AppError(
        errors.array().map(err => err.msg).join(", "),
        400
    );
    const { id } = req.params;

    const show = await prisma.show.findUnique({
    where: { id },
    include: {
        movie: true,
        screen: {
            include: {
                theatre: true
            }
        },
        showSeats: {
            include: {
                seat: true
            }
        },
        pricings:true
    }
}); 

    if (!show) {
        throw new AppError("Show not found", 404);
    }

    return res.status(200).json({
        success: true,
        data: show
    });
});  