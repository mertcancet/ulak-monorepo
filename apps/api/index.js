import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("API works 🚀");
});

app.listen(3001, () => {
  console.log("API running on 3001");
});
