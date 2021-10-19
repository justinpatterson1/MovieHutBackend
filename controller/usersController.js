const usersServices =  require('../services/usersServices');
const express = require('express');
const router = express.Router();




router.get("/",usersServices.getAllUsers)
router.post("/",usersServices.createAUser)
router.get("/:id",usersServices.getAUser)
router.delete("/:id",usersServices.deleteAUser)
router.put("/:id",usersServices.updateAUser)

module.exports = router;
