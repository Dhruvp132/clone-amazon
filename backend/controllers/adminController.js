const Product = require("../ models/Product");
const express = require("express");
const router = express.Router();
const Admin = require("../ models/Admin");


// router.get("/check", (req, res) => {
//   // check is Admin exists in the database 
// });

router.post("/adminsignup", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ msg: "Email field not found" });
    }
    if (!password) {
      return res.status(400).json({ msg: "password field not found" });
    }
    const admin = await Admin.create({ email, password });
    res.status(200).json({ admin, msg: "Admin created successfully.." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }

  router.post("/adminsignin", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email) {
        return res.status(400).json({ msg: "Email field not found" });
      }
      const admin = await Admin.findOne({email});
      if (!admin) {
        return res.status(400).json({ msg: "Admin with given email not found" });
      }
      //check the password 
      if (admin.password !== password) {
        return res.status(400).json({ msg: "Password is incorrect" });
      }

      res.status(200).json({ admin, msg: "Admin logged in successfully.." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  });
});


router.get("/products" , async(req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
})



router.post("/addproduct", async (req, res) => {
  try {
    const { title, price, image } = req.body;
    if (!title) {
      return res.status(400).json({ msg: "title field not found" });
    }
    if (!image) {
      return res.status(400).json({ msg: "image link field not found " });
    }
    if (!price) {
      return res.status(400).json({ msg: "Price field not found" });
    }
    const product = await Product.create({ title, image, price });
    res.status(200).json({ product, msg: "Product created successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.put("/updateProduct/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    console.log(productId)
    const { title, price, image } = req.body;
    if (!title) {
      return res.status(400).json({ msg: "title field not found" });
    }
    if (!image) {
      return res.status(400).json({ msg: "image link field not found " });
    }
    if (!price) {
      return res.status(400).json({ msg: "Price field not found" });
    }
    console.log(productId);
    console.log(")a90fsi09dasiuf09uasd");
    let product = await Product.findById(productId);     
    if (!product) {       
      return res.status(400).json({ msg: "Product with given id not found" });     
    }      

    product = await Product.findByIdAndUpdate(productId, { title, price, image }, { new: true });
    res.status(200).json({ product, msg: "Product details updated successfully.." });
  } catch(e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});
router.delete("/delete/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    // if (!mongoose.Types.ObjectId.isValid(productId)) {
    //   return res.status(400).json({ msg: "Invalid product ID format" });
    // }
    
    const product = await Product.findByIdAndDelete(productId);

    if (!product) return res.status(404).json({ msg: "Product with the given ID not found" });
    res.status(200).json({ product, msg: "Product deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;