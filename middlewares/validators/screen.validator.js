import {body,param} from  "express-validator"


export const validateScreen=[
    body("screenNumber").exists().withMessage("screenNumber  is required").bail().notEmpty().withMessage("Name should not be empty"),
    body("theatreId").exists().withMessage("theatreId is required").bail().notEmpty().withMessage("address should not be empty")
]

export const validateScreenId=[
    param("id").exists().withMessage("provide id in params")

]