const express = require("express");
const TicketModel = require("./Models/ticketModel.js");
const sequelize = require("./utils/database.js");
const ticketRouter = require("./routes/ticketRouter.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/ticket", ticketRouter);
(async () => {
  const response = await sequelize.sync();
})();
module.exports = app;
