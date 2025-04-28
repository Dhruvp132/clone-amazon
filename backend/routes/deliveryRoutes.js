const express = require("express");
const deliveryController = require("../controllers/deliveryController");
const router = express.Router();


router.post("/deliverysignup", deliveryController.addDeliveryUser);
router.post("/deliverylogin", deliveryController.getDeliveryUser);
router.get("/check", deliveryController.checkDeliveryStatus);
router.get("/", deliveryController.getDeliveries);
router.get("/cartDetails/:userId", deliveryController.getCartDetails);
router.post("/add", deliveryController.addDelivery);
router.put("/update", deliveryController.updateDelivery);

module.exports = router;