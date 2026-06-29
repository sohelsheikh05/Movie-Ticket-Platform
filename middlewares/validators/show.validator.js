import { body ,param} from "express-validator";

export const validateShow = [

    body("movieId")
        .notEmpty()
        .withMessage("movieId is required"),

    body("theatreId")
        .notEmpty()
        .withMessage("theatreId is required"),

    body("screenId")
        .notEmpty()
        .withMessage("screenId is required")
        .bail(),

    body("startTime")
        .notEmpty()
        .withMessage("startTime is required")
        .bail()
        .isISO8601()
        .withMessage("startTime must be a valid datetime"),

    body("endTime")
        .notEmpty()
        .withMessage("endTime is required")
        .bail()
        .isISO8601()
        .withMessage("endTimemust be a valid datetime"),

    body("endTime").custom((value, { req }) => {
        if (new Date(value) <= new Date(req.body.startTime)) {
            throw new Error("endTime must be after Start Time");
        }
        return true;
    }),
    body("priceStandard")
        .notEmpty()
        .withMessage("priceStandard is required")
        .bail(),
    body("pricePremium")
        .notEmpty()
        .withMessage("priceStandard is required")
        .bail(),
    body("priceBalcony")
        .notEmpty()
        .withMessage("priceStandard is required")
        .bail(),
];


export const validateShowId = [
    param("id")
        .notEmpty()
        .withMessage("showId is required")
        .bail()
        .isString()
        .withMessage("Invalid Show Id")
];