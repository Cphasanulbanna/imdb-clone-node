const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connectDb } = require("./config/db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

connectDb();

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
