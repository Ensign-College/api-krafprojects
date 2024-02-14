const express = require("express");
const cors = require("cors");
const Redis = require("redis");

const options = { origin: "http://localhost:3000" };

const redisClient = Redis.createClient({
  url: `redis://localhost:6379`,
});

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors(options));

app.get("/boxes", async (req, res) => {
  let boxes = await redisClient.json.get("boxes", { path: "$" });
  res.json(boxes[0]);
});

app.post("/boxes", async (req, res) => {
  let data = req.body;
  console.log(data);
  await redisClient.json.arrAppend("boxes", "$", data);
  res.json(data);
});

app.listen(PORT, () => {
  redisClient.connect();
  console.log(`Listening on port ${PORT}`);
});
