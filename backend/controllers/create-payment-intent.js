const Product = require("../ models/Product");
const express = require("express");
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

router.post("/create-payment-intent", async (req, res) => {
  try {
    const userEmail = req.params.email;
    const { amount } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    
    await prismaClient.user.update({
        where : {
            email : userEmail,    
        }, 
        data : {
          paid : true, 
          songLimit, 
        }
    })
    console.log(paymentIntent.client_secret)
    return res.json({ 
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Internal Error:", error);
    // Handle other errors (e.g., network issues, parsing errors)
    return res.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
})