const express = require("express");
const router = express.Router();
const user = require("./controllers/userController");
const { createUser, userSignin } = user;
const { verifyToken, verifyUserToken } = require("./verifyAuth");
const {  updateUserToAdmin } = require("./controllers/isAdminController");
const {
    placeOrderForParcel,
    getUserParcelById,
    updateDestinationByUserId,
    updateLocationByAdmin,
    updateStatusByAdmin,
    getUserParcel,
    cancelDeliveryOrder,
} = require("./controllers/parcelcontroller");

router.post("/auth/signup", createUser);
router.post("/auth/login", userSignin);
router.post("/parcel",verifyUserToken, placeOrderForParcel);
//get
router.get("/parcel/:id",verifyUserToken, getUserParcelById);
router.get("/parcel",verifyUserToken, getUserParcel);
router.get("/parcelAdmin", verifyUserToken, getUserParcel);


//put
router.put("/parcel/destination/change/:id",verifyUserToken, updateDestinationByUserId);
router.put("/parcel/location/change/:id",verifyToken, updateLocationByAdmin);
router.put("/parcel/status/change/:id", verifyToken, updateStatusByAdmin);
router.put("/update/:id", verifyUserToken, updateUserToAdmin);


router.put("/parcel/delete/:id",verifyUserToken, cancelDeliveryOrder);

module.exports = router;
