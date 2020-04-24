const express = require("express");
const router = express.Router();
const user = require('./controllers/userController')
const {createUser} = user

router.post(
    "/auth/signup",
        createUser
        )
   
    module.exports = router