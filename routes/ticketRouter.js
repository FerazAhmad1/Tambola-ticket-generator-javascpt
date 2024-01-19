const express = require("express");
const { fetchAll, saveTicket } = require("../controllers/ticketController.js");
const router = express.Router();

router.route("/").get(fetchAll).post(saveTicket);
module.exports = router;
