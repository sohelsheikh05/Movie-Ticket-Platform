import {body,param} from  "express-validator"


export const validateMovie=[
    body("name").exists().withMessage("Name of Movie is required").bail().notEmpty().withMessage("Name should not be empty"),
    body("releaseDate").exists().withMessage("ReleaseDate is required is required").bail().notEmpty().withMessage("releaseDate should not be empty"),
    body("rating").exists().withMessage("Rating is required").bail().notEmpty().withMessage("rating should not be empty").bail().isInt({min:0,max:5}),
    body("cast").exists().withMessage("Cast details is required").bail().notEmpty().withMessage("cast should not be empty"),
    body("director").exists().withMessage("Director name is required").bail().notEmpty().withMessage("director should not be empty"),
    body("producer").exists().withMessage("Producer name  is required").bail().notEmpty().withMessage("producer should not be empty"),
    body("durationMinutes").exists().withMessage("durationMinutes in minutes is required").bail().notEmpty().withMessage("durationMinutes should not be empty"),
    body("language").exists().withMessage("Language is required").bail().notEmpty().withMessage("language should not be empty")
]

export const validateMovieId=[
    param("id").exists().withMessage("provide id in params")

]