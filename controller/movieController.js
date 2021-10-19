const express = require('express');
const router = express.Router();
const movieServices = require('../services/movieServices.js')

router.get("/",movieServices.getAllMovies)
router.post("/",movieServices.createAMovie)
// router.get("/:type",movieServices.getAllShows)
router.get("/:id",movieServices.getAMovie)

router.delete("/:id",movieServices.deleteAMovie)
router.put("/:id",movieServices.updateAMovie)



module.exports = router;