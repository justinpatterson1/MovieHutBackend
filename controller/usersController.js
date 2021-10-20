const usersServices =  require('../services/usersServices');
const usersMiddleware = require('../middleware/usersMiddleware')
const express = require('express');
const router = express.Router();




router.get("/",usersMiddleware.protectedRoutes,usersServices.getAllUsers)
router.post("/",usersServices.createAUser)
router.get("/:id",usersServices.getAUser)
router.delete("/:id",usersServices.deleteAUser)
router.put("/:id",usersServices.updateAUser)
router.post("/auth",usersServices.userAuthentication)

module.exports = router;
