const express = require("express");
const Delivery = require("../ models/Delivery");
const router = express.Router();

const DeliveryUser = require("../ models/DeliveryUser");

const addDeliveryUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email) {
      return res.status(400).json({ msg: "Email field not found" });
    }
    if (!password) {
      return res.status(400).json({ msg: "Password field not found" });
    }
    const deliveryUser = await DeliveryUser.create({ email, password });
    res.status(200).json({ deliveryUser, msg: "Delivery user created successfully.." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

const getDeliveryUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ msg: "Email field not found" });
    }
    const deliveryUser = await DeliveryUser.findOne({ email });
    if (!deliveryUser) {
      return res.status(400).json({ msg: "Delivery user with given email not found" });
    }
    //check the password 
    if (deliveryUser.password !== password) {
      return res.status(400).json({ msg: "Password is incorrect" });
    }

    res.status(200).json({ deliveryUser, msg: "Delivery user logged in successfully.." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

const checkDeliveryStatus = (req, res) => {
  res.send("Delivery route");
};

const getDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.status(200).json({ deliveries });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const updateDelivery = async (req, res) => {
  try {
    const { deliveryId, orderStatus, paymentStatus, deliveryAgentId } = req.body;
    const updatedDelivery = await Delivery.findByIdAndUpdate(
      deliveryId,
      { orderStatus, paymentStatus, deliveryAgentId },
      { new: true }
    );

    if (!updatedDelivery) {
      return res.status(404).json({ msg: "Delivery not found" });
    }

    res.status(200).json({ updatedDelivery, msg: "Update details successfully.." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const addDelivery = async (req, res) => {
  try {
    const { orderId, userId, orderStatus, paymentStatus, deliveryId, deliveryAgentId, basket } = req.body;
    const newDelivery = new Delivery({
      orderId,
      userId,
      orderStatus,
      paymentStatus,
      deliveryId,
      deliveryAgentId,
      basket,
    });

    await newDelivery.save();
    res.status(201).json({ newDelivery, msg: "Delivery added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getCartDetails = async (req, res) => {
  try {
    const { userId } = req.params; // Use route parameter
    const cartDetails = await Delivery.findById(userId);
    res.status(200).json({ cartDetails });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = {
  addDeliveryUser,
  getDeliveryUser,
  checkDeliveryStatus,
  getDeliveries,
  updateDelivery,
  addDelivery,
  getCartDetails
};