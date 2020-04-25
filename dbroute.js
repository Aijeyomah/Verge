const express = require("express");
const router = express.Router();
const user = require('./controllers/userController')
const {createUser, userSignin } = user

const orderParcel =require('./controllers/parcelcontroller')
const {placeOrderForParcel,getUserParcelById, updateParcelDeliveryLocation, cancelDeliveryOrder}= orderParcel

router.post("/auth/signup",createUser )
router.post("/auth/login", userSignin )

router.post("/parcel",placeOrderForParcel )

router.get("/parcel/:id", getUserParcelById)
router.put("/parcel/destination/change/:id",updateParcelDeliveryLocation)
router.delete("/parcel/destination/delete/:id",cancelDeliveryOrder)

      
           
module.exports = router