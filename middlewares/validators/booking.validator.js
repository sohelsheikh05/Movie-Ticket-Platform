import {body,param} from  "express-validator"


export const validateBooking=[
    body("showId").exists().withMessage("showId is required").bail().notEmpty().withMessage("showId should not be empty"),
    body("showSeatIds").exists().withMessage("showSeatIds  is required").bail().notEmpty().withMessage("Select some seats to book").isArray().withMessage("showSeatIds should be an array")
]

export const validateBookingId=[
    param("id").exists().withMessage("provide id in params")

]

