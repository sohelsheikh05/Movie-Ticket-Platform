// import { AppError } from "../libs/Error.js";
// import { catchAsync } from "../middlewares/errorHandler.middleware.js"
// import { validationResult } from "express-validator";
// import prisma from "../config/prisma.js";
// export const addShowSeat = async (showId,screenId,tx) => {
  
//    const screen = await prisma.screen.findUnique({
//     where: { id: screenId },
//     include: {
//         seats: true
//     }
// });

//     if (!screen) {
//         throw new AppError("Screen not found", 404);
//     }

//     if (screen.seats.length === 0) {
//         throw new AppError("No seats found for this screen", 404);
//     }

//     for(const seat of screen.seats){
//         await tx.showSeat.create({data:{showId,screenId}})
//     }
    
// };
// export const deleteShow = catchAsync(async (req, res) => {
//    const errors=validationResult(req);
//     //console.log(validationResult(req))
//     if(!validationResult(req).isEmpty())   throw new AppError(
//         errors.array().map(err => err.msg).join(", "),
//         400
//     );
//     const { id } = req.params;

//     const existing = await prisma.show.findUnique({
//         where: { id }
//     });

//     if (!existing) {
//         throw new AppError("Show not found", 404);
//     }

//     await prisma.show.delete({
//         where: { id }
//     });

//     return res.status(200).json({
//         success: true,
//         message: "Show deleted successfully"
//     });
// });

// export const updateShow = catchAsync(async (req, res) => {
//        const errors=validationResult(req);
//     //console.log(validationResult(req))
//     if(!validationResult(req).isEmpty())   throw new AppError(
//         errors.array().map(err => err.msg).join(", "),
//         400
//     );
//     const { id } = req.params;

//     const existing = await prisma.show.findUnique({
//         where: { id }
//     });

//     if (!existing) {
//         throw new AppError("Show not found", 404);
//     }

//     const {
//         movieId,
//         theatreId,
//         screenNumber,
//         startTime,
//         endTime
//     } = req.body;

//     const screen = await prisma.screen.findUnique({
//         where: {
//             theatreId_screenNumber: {
//                 theatreId,
//                 screenNumber
//             }
//         }
//     });

//     if (!screen) {
//         throw new AppError("Screen not found", 404);
//     }

//     const show = await prisma.show.update({
//         where: { id },
//         data: {
//             movieId,
//             screenId: screen.id,
//             startTime: new Date(startTime),
//             endTime: new Date(endTime)
//         }
//     });

//     return res.status(200).json({
//         success: true,
//         message: "Show updated successfully",
//         data: show
//     });
// });
// export const getShow = catchAsync(async (req, res) => {
//        const errors=validationResult(req);
//     //console.log(validationResult(req))
//     if(!validationResult(req).isEmpty())   throw new AppError(
//         errors.array().map(err => err.msg).join(", "),
//         400
//     );
//     const { id } = req.params;

//     const show = await prisma.show.findUnique({
//         where: { id },
//         include: {
//             movie: true,
//             screen: {
//                 include: {
//                     theatre: true
//                 }
//             }
//         }
//     });

//     if (!show) {
//         throw new AppError("Show not found", 404);
//     }

//     return res.status(200).json({
//         success: true,
//         data: show
//     });
// });  

// export const getShows = catchAsync(async (req, res) => {

//     const shows = await prisma.show.findMany({
//         include: {
//             movie: true,
//             screen: {
//                 include: {
//                     theatre: true
//                 }
//             }
//         }
//     });

//     return res.status(200).json({
//         success: true,
//         data: shows
//     });
// });

