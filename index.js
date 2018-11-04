require("dotenv").config();

const express = require("express");
const app = express();
const sequelize = require("./db");
const bodyParser = require("body-parser");
const port = process.env.PORT;

const user = require("./controllers/usercontroller");
const housing = require("./controllers/housingcontroller");
const ticket = require("./controllers/ticketcontroller");
const coords = require("./controllers/coordscontroller");
const message = require("./controllers/messagecontroller");

sequelize.sync();
app.use(bodyParser.json());
app.use(require("./middleware/headers"));

app.use("/api/user", user);

app.use(require("./middleware/validate-session"));
app.use("/api/housing", housing);
app.use("/api/coords", coords);
app.use("/api/ticket", ticket);
app.use("/api/message", message);

app.listen(port, () => console.log(`Server listening on port ${port}`));
