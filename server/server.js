require("dotenv").config();
const repudable_badges = require("./reputableBadges");
const express = require("express");
const app = express();
const getENSValuation = require("./ENSValuation");
const getLensValuation = require("./getLensValuation");

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.get("/get-data", async (req, res) => {
  const address = req.query.address;
  const repudable_badges_holded = [];
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

  for (badge of repudable_badges) {
    if (badge_list.find(badge_holded => badge_holded.id === badge.id)) {
      repudable_badges_holded.push(badge);
    }
  }
  console.log({repudable_badges_holded})
  
  res.send({badge_list});
});

const check_ens_and_lens_ownership = async (address) => {
  if(!address) throw new Error('No address provided');

  const response = await fetch(`https://api.web3.bio/profile/${address}`);

  const data = await response.json();
  const ens = data.filter((d) => d.platform === "ENS");
  const lens = data.filter((d) => d.platform === "lens");
  const have_ens = ens.length > 0;
  const have_lens = lens.length > 0;
  const send_data = {
    have_ens,
    have_lens,
    ens: have_ens ? ens[0].identity : null,
    lens: have_lens ? lens[0].identity : null,
  }

  return send_data;
}

app.get('/get-address-max-borrow-amount', async (req, res) => {
  const { address } = req.query;
  if(!address) return res.send({error: 'No address provided'})

  console.log({address})

  const { have_ens, have_lens, ens, lens} = await check_ens_and_lens_ownership(address);

  let ens_valuation = 0;
  let lens_valuation = 0;
  
  if(have_ens){
    ens_valuation = getENSValuation(ens);
  }

  if(have_lens){
    lens_valuation = await getLensValuation(lens);
  }

  const MAX_TVL_FACTOR = 0.7;

  console.log({ens_valuation, lens_valuation})

  const maxBorrowAmount = MAX_TVL_FACTOR * (ens_valuation + lens_valuation);
  const send_data = {
    maxBorrowAmount,
  }

  console.log({send_data})
  res.send(send_data);
});

app.listen(3001);