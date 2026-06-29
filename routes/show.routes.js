import express from "express";

import {
    addShow,
    getShow,
    getShows,
    updateShow,
    deleteShow,
    getShowSeats
} from "../services/shows.service.js";

import {
    validateShow,
    validateShowId
} from "../middlewares/validators/show.validator.js";

const router = express.Router();

router.post(
    "/show",
    validateShow,
    addShow
);

router.get(
    "/shows",
    getShows
);

router.get(
    "/show/:id",
    validateShowId,
    getShow
);
router.get(
    "/showSeats/:id",
    validateShowId,
    getShowSeats
);
router.put(
    "/show/:id",
    validateShowId,
    validateShow,
    updateShow
);

router.delete(
    "/show/:id",
    validateShowId,
    deleteShow
);

export default router;