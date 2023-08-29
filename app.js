const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { connectDatabase } = require("./config/database");
const router = require("./router/index");
app.use("/api", router);

connectDatabase();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
