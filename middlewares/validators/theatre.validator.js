import {body,param} from  "express-validator"


export const validateTheatre=[
    body("name").exists().withMessage("Name of Theatre is required").bail().notEmpty().withMessage("Name should not be empty"),
    body("address").exists().withMessage("address is required").bail().notEmpty().withMessage("address should not be empty"),
     body("city").exists().withMessage("city is required").bail().notEmpty().withMessage("city should not be empty"),
      body("pincode").exists().withMessage("pincode is required").bail().notEmpty().withMessage("pincode should not be empty")
]

export const validateTheatreId=[
    param("id").exists().withMessage("provide id in params")

]