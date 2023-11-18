require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.get("/get-data", async (req, res) => {
  const response = await fetch('https://api.wiw.io/public/user/profile/name/nandy');
  const data = await response.json();
  const { partner_claims } = data;
  const polygonID_badges = data.partner_claims.polygon_id.badges
  console.log({data})
  console.log({partner_claims})
  console.log({polygonID_badges})
  res.send(data);
});

app.listen(3001);