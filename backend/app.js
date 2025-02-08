const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./src/routes");
const app = express();

require("dotenv").config();


app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);

app.listen(process.env.PORT, () => {
    console.log(`PORT is listening ${process.env.PORT}`)
});
