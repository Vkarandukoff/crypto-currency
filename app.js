require("dotenv").config();

const { response } = require("express");
const express = require("express");
const axios = require("axios").default;

const app = express();
const PORT = process.env.API_PORT | 3000;

app.use(express.json());

app.get("/rates", (req, res) => {
  const crypto = req.query.currency;

  if (!crypto) {
    res.status(200).json({ message: "Enter cryptocurrency!" });
  }

  const config = {
    method: "get",
    url: `http://api.coincap.io/v2/assets/${crypto}`,
    headers: {},
  };

  axios(config)
    .then(function (response) {
      const { priceUsd } = response.data.data;
      res.send(`${crypto.toUpperCase()} price in usd: ${priceUsd} $`);
    })
    .catch(function (error) {
      res.status(404).json({ message: "Non-existent cryptocurrency!" });
    });
});

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Listening port ${PORT}`);
});
