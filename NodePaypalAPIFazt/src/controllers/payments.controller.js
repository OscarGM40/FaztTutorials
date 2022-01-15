import axios from "axios";
// const axios = require("axios");
import { BACKEND_URL, PAYPAL_API } from "../config";
// const { PAYPAL_API, PAYPAL_CLIENT, PAYPAL_SECRET } = require("../config");

exports.createOrder = async (req, res) => {
  try {
    const order = {
      intent: "CAPTURE",
      /* purchase_units es un arreglo de ordenes de compra */
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "105.70", // $1.00 USD(siempre minimo)
            description: "Computer keyboard",
          },
        },
      ],
      application_context: {
        brand_name: "MyCompany.com",
        landing_page: "LOGIN",
        user_action: "PAY_NOW", //PAY_NOW, AUTHORIZE, ORDER
        shipping_preference: "NO_SHIPPING",
        return_url: `${BACKEND_URL}/payments/capture-order`,
        cancel_url: `${BACKEND_URL}/payments/cancel-order`,
      },
    };

    /* tras crear la orden debo enviar a PAYPAL API por POST la orden,junto con algún mecanismo de autenticación,como mis credenciales con una Basic Auth, o las puedo intercambiar por un token temporal */

    /* prehistoric Basic Auth form */
    /*   const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
    auth:{
      username: PAYPAL_CLIENT,
      password: PAYPAL_SECRET
    }
  }); */

    /* cambio mis credentials por el token temporal */
    const {
      data: { access_token },
    } = await axios.post(
      `${PAYPAL_API}/v1/oauth2/token`,
      new URLSearchParams({
        grant_type: "client_credentials",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: process.env.PAYPAL_CLIENT,
          password: process.env.PAYPAL_SECRET,
        },
      }
    );
    // console.log(access_token);

    /* ahora si,en vez de Basic Auth usamos Authorization:Bearer token */
    const { data } = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    
    res.json({orders:data});

  } catch (error) {
    console.log(error);
    res.status(500).send("Algo fue mal,llama a Harry Potter");
  }
};
