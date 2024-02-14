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

app.get("products/", async (req, res) => {
  await redisClient.ft;
});

app.post("/boxes", async (req, res) => {
  let data = req.body;
  console.log(data);
  await redisClient.json.arrAppend("boxes", "$", data);
  res.json(data);
});

//A function to create a new product
app.post("/products", async (req, res) => {
  const newProduct = req.body;
  const productKey = `product: ${newProduct.productID}-${Date.now()}`;

  try {
    await redisClient.json.set(productKey, ".", newProduct);
    console.log("Product added successfully to Redis");
  } catch (error) {
    console.error("Error adding product to Redis:", error);
  }
  res.json(newProduct);
});

app.listen(PORT, () => {
  redisClient.connect();
  console.log(`Listening on port ${PORT}`);
});
