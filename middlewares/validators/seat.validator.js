import {body,param} from  "express-validator"


export const validateSeat=[
    body("seatNumber").exists().withMessage("seatNumber  is required").bail().notEmpty().withMessage("seatNumber should not be empty"),
    body("screenId").exists().withMessage("screenId is required").bail().notEmpty().withMessage("screenId should not be empty"),
    body("seatType").exists().withMessage("seatType is required").bail().notEmpty().withMessage("seatType should not be empty")
]

export const validateSeatId=[
    param("id").exists().withMessage("provide id in params")

]