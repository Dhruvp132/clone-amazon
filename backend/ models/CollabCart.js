const mongoose = require('mongoose');

const collabCartSchema = new mongoose.Schema({
    cartId: { type: String, required: true, unique: true },
    users: [{ type: String, required: true }], // Array of user emails
    products: [
        {
            productId: String,
            title: String,
            image: String,
            price: Number,
            rating: Number,
            addedBy: String, // Email of the user who added the product
        },
    ],
});

module.exports = mongoose.model('CollabCart', collabCartSchema);