import { catchAsync } from "../middlewares/errorHandler.middleware.js";
import prisma from "../config/prisma.js";



export const search = catchAsync(async (req, res) => {
    var city = req.query.city;
    city=city.trim().toLowerCase();
    const q = req.query.q?.trim().toLowerCase();

    if (!city) {
        throw new AppError("City is required", 400);
    }

  const where = {
    screen: {
        theatre: {
            city
        }
    },
    startTime: {
        gte: new Date()
    }
};
console.log("Now:", new Date().toISOString());
    if (q) {
        where.OR = [
            {
                movie: {
                    name: {
                        contains: q
                    }
                }
            },
            {
                screen: {
                    theatre: {
                        name: {
                            contains: q
                        }
                    }
                }
            }
        ];
    }

    const shows = await prisma.show.findMany({
        where,
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

export default search;