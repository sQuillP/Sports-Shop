const express = require("express");
const app = express();
const admin = require("./firebase/firebase.config");
const dbConnect = require("./db/dbConnect");
const dotenv = require("dotenv");
dotenv.config({path:"./environments/environments.env"});

const validateToken = require("./middleware/validateToken");

const catchError = require('./middleware/error');

const cors = require('cors');
app.use(cors({origin:"*"}));
app.use(express.json())

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY,{apiVersion: "2020-08-27"})

const StoreItem = require('./schema/StoreItem');

dbConnect();

//apply user validation to access endpoints
// app.use(validateToken);

app.post('/payment-sheet', async (req, res, next) => {
    // Use an existing Customer ID if this is a returning customer.

    try{
        const customer = await stripe.customers.create();

        console.log(req.body.amount);
        const paymentAmount = Math.floor(req.body.amount * 100);
        console.log(paymentAmount);
        //Retrieve
        const ephemeralKey = await stripe.ephemeralKeys.create(
          {customer: customer.id},
          {apiVersion: '2020-08-27'},
          
        );

        //Retrieve a payment intent
        const paymentIntent = await stripe.paymentIntents.create({
          amount: paymentAmount,
          currency: 'USD',
          customer: customer.id,
          automatic_payment_methods: {
            enabled: true,
          },
        });

        console.log('sending payment info');
        console.log({
          paymentIntent: paymentIntent.client_secret,
          ephemeralKey: ephemeralKey.secret,
          customer: customer.id,
          publishableKey: 'pk_test_51KOUJxJ576ujCfsdT45KdDG04OGQRoPUdZeYyvAk3hIBU1G6g2TCjuyj2Y9dVnE8nyxj0zg1L5MOaOLhvArHwlmb00UkuTaiaE'
        })
        //Return payment information to the customer.
        res.json({
          paymentIntent: paymentIntent.client_secret,
          ephemeralKey: ephemeralKey.secret,
          customer: customer.id,
          publishableKey: 'pk_test_51KOUJxJ576ujCfsdT45KdDG04OGQRoPUdZeYyvAk3hIBU1G6g2TCjuyj2Y9dVnE8nyxj0zg1L5MOaOLhvArHwlmb00UkuTaiaE'
        });
    } catch(error) {
      console.log(error.message);
      return next(error);
    }
  });



  /**
   * route: GET /items/:category?name=itemname
   */
  app.get('/items/:category', async (req,res,next)=> {


    console.log('serving data')
    let limit = 10;

    let query = StoreItem.find({
      category: req.params.category,
    });

    console.log(req.query.name,req.query.limit);

    if(req.query.name){
      query = query.where('name',new RegExp(req.query.name,"gi"));
    }

    if(req.query.limit){
      limit = req.query.limit;
    }

    try{
      const responseData = await query.limit(limit);
      res.status(200).json({
        itemCount: responseData.length,
        data: responseData
      });
    } catch(error){
      console.log(error.message)
      return next(error);
    }

  });

  app.use(catchError);


app.listen(3000,()=> {
    console.log("Server listening on port 3000");
});

