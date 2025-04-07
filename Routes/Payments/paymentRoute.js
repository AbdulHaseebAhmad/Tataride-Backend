import { Router } from "express";
import { config as configDotenv } from "dotenv";
import Stripe from 'stripe';

configDotenv();

const paymentRoute = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01',
});
paymentRoute.get("/api/checkout/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

paymentRoute.post("/api/checkout/create-payment-intent", async (req, res) => {
  const {body:{fare}} = req;
  const fareInCents = Math.round(fare * 100);

  console.log(fareInCents)
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "AUD",
      amount: fareInCents,
      automatic_payment_methods: { enabled: true },
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

export default paymentRoute;
