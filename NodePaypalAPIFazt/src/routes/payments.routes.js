import axios from "axios";
import { Router } from "express";
import { PAYPAL_API  } from "../config";

const router = Router();
// const router = require('express').Router();

import { createOrder } from "../controllers/payments.controller";
// const { createOrder } = require('../controllers/payments.controller');

router.post("/create-order", createOrder);

router.get("/capture-order", async (req, res) => {
  const { token, PayerID } = req.query;

  console.log(token, PayerID);

  const response = await axios.post(
    `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,{},{
      auth: {
        username: process.env.PAYPAL_CLIENT,
        password: process.env.PAYPAL_SECRET,
    }});
  console.log(response.data);
  
  return res.redirect(`/payed.html`);
});

router.get("/cancel-order", (req, res) => {
  return res.redirect(`/index.html`);
});

// module.exports = router;
export default router;
