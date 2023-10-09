const express = require("express");
const ConnectToDataBase = require("../server/database/connect");
const app = express();
const port = process.env.PORT || 5000;
const baseUrl = "/api";
const cors = require("cors");
let user = require('./routes/user')
require("dotenv").config();

app.use(baseUrl, user)
ConnectToDataBase();
app.use(cors());
app.use(express.json());


app.listen(port, () => {
  console.log(`Servidor Express está rodando na porta ${port}`);
});
