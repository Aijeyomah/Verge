const express = require("express");
const router = express.Router();
const user = require('./controllers/userController')
const {createUser, userSignin } = user

router.post("/auth/signup",createUser )
router.post("/auth/login", userSignin )
      
           
    module.exports = router