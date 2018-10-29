require("dotenv").config();

const express = require("express");
const app = express();
const sequelize = require("./db");
const bodyParser = require("body-parser");
const port = process.env.PORT;

const user = require("./controllers/usercontroller");

sequelize.sync();
app.use(bodyParser.json());
app.use(require("./middleware/headers"));

app.use("/api/user", user);

app.use(require("./middleware/validate-session"));

app.listen(port, () => console.log(`Server listening on port ${port}`));
