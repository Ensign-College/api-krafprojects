const express = require("express");

const boxes = [{ boxID: 1 }, { boxID: 2 }, { boxID: 3 }, { boxID: 4 }];

const app = express();

app.get("/boxes", (req, res) => {
  res.send(JSON.stringify(boxes));
});

app.listen(3000);
