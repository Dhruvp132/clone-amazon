const express = require("express");
const deliveryController = require("../controllers/deliveryController");
const router = express.Router();

router.post("/deliverysignup", deliveryController.checkDeliveryStatus);
router.post("/deliverylogin", deliveryController.getDeliveries);

module.exports = router;