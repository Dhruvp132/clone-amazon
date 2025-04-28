const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title : {
    type : String, 
    required : false
  },
  image: {
    type: String, 
    required: true,
  },
  price: {
    type : Number,
    default: 0,
    required : true,
  },
  rating: {
    type : Number,
    default: 0,
    required : false,
  },
}, {
  timestamps: true
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;