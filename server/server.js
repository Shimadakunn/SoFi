require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.get("/get-data", async (req, res) => {
  const address = req.query.address;
  if(!address) return res.send({error: 'No address provided'})

  const response = await fetch(`https://advanced-api.wiw.io/badges/address/${address}`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'SiTjGCHbdACja4fzxFXGwebpZAaydJQT' // Ask WiW for a specific API key
    }
  });
  const data = await response.json();
  const { badge_list } = data;
  console.log({badge_list})
  res.send({badge_list});
});

app.listen(3001);