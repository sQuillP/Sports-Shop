const express = require("express");
const app = express();
const admin = require("./firebase/firebase.config");
const dbConnect = require("./db/dbConnect");
const dotenv = require("dotenv");
dotenv.config({path:"./environments/environments.env"});

const cors = require('cors');
app.use(cors({origin:"*"}));

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY,{apiVersion: "2020-08-27"})

dbConnect();

app.post('/payment-sheet', async (req, res) => {
    // Use an existing Customer ID if this is a returning customer.
    const customer = await stripe.customers.create();

    //Retrieve
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer: customer.id},
      {apiVersion: '2020-08-27'},
      
    );

    //Retrieve a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: 'USD',
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    //Return payment information to the customer.
    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: 'pk_test_51KOUJxJ576ujCfsdT45KdDG04OGQRoPUdZeYyvAk3hIBU1G6g2TCjuyj2Y9dVnE8nyxj0zg1L5MOaOLhvArHwlmb00UkuTaiaE'
    });
  });



app.listen(3000,()=> {
    console.log("Server listening on port 3000");
});

