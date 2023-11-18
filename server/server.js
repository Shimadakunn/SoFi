require("dotenv").config();
const express = require("express");
const app = express();
const { LensClient, production } = require("@lens-protocol/client");

const lensClient = new LensClient({
  environment: production
});

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

app.get('/check-lilgho-follow', async (req, res) => {
  const lensClient = new LensClient({
    environment: production
  });

  const profileByHandle = await lensClient.profile.fetch({
    forHandle: "lens/lilgho",
  })
  
  console.log(`Profile fetched by handle: `, {
    id: profileByHandle.id,
    handle: profileByHandle.handle,
  })

  const userHandel = 'lens/balakhonoff';

  let isFollowedByStani = false;

  let followings = [];
  let i = 0;
  let result;
  while (i >= 0 ) {
    if(i===0){
      result = await lensClient.profile.followers({
        of: profileByHandle.id,
      });
    }else{
      result = await result.next();
    }

    const newFollowings = result.items.map((p) => {
      if(p.handle === null){
        i = -Infinity;
        return [];
      }
      return p.handle.fullHandle;
    });
    followings = [...followings, ...newFollowings];
    if(newFollowings.includes(userHandel)){
      isFollowedByStani = true;
      break;
    }
    console.log(
      `#${i}`,
      `Followers:`,
      newFollowings
    );
    i++;
  }

  console.log({isFollowedByStani})

  console.log({
    followings: followings.sort(),
  })
  
  res.send({ followings: followings.sort(), isFollowedByStani });
})

app.listen(3001);