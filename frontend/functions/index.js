const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51R1R5HJlvCjqT1EtZtTA6GAN9QBoiAeB0lpLEUDWzMfwqxhJQRwd5ZOGt8fEEE3q6VJyL8S7bR3TPSdx08urdm9r001fkUssjN"
);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hi Kiwwuu"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  console.log("paymentRECEIVED >>> ", paymentIntent);
  // OK - Created
  response.status(201).send({
    message : "payment received", 
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/challenge-4b2b2/us-central1/api


// http://127.0.0.1:5001/clone-f330b/us-central1/api

// http://127.0.0.1:5001/clone-f330b/us-central1/api