const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ["failed", "pending", "completed"],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["failed", "pending", "completed"],
    required: true,
  },
  deliveryId: {
    type: String,
    required: true,
  },
  deliveryAgentId: {
    type: String,
    required: true,
  },
  basket: {
    type: Array,
    required: true,
  },
});

const Delivery = mongoose.model("Delivery", deliverySchema);
module.exports = Delivery;