const schema = require("./ticketSchema");
const pagelimitSchema = require("./pageLimitSchema.js");
const ticketModel = require("../Models/ticketModel.js");
const tambola = require("tambola-generator").default;
const { applyValidation, makeResponse } = require("./helper.js");
const {
  FOURHUNDRED,
  FIVEHUNDRED,
  FAIL,
  INTERNALSERVERERROR,
  CHECKFINDALLMETHOD,
  CHECKBULKCREATEMETHOD,
  BADREQUEST,
  TWOHUNDRED,
  TWOHUNREDONE,
} = require("./CONSTANTS.js");

exports.fetchAll = async (req, res, next) => {
  try {
    if (req.query.limit || req.query.page) {
      const response = await applyValidation(
        {
          limit: req.query.limit,
          page: req.query.page,
        },
        pagelimitSchema
      );
    }
  } catch (error) {
    console.log(error);
    res.status(error.errorCode || FOURHUNDRED).json({
      status: FAIL,
      errorCode: BADREQUEST,
      message: error.message,
    });
    return;
  }

  try {
    let limit = req.query.limit * 1 || 20;
    let page = req.query.page * 1 || 1;
    let offset = limit * (page - 1);
    const response = await ticketModel.findAll({ offset, limit });
    let ans = makeResponse(response);
    res.status(TWOHUNDRED).json({
      tickets: ans,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(FIVEHUNDRED).json({
      status: FAIL,
      errorCode: INTERNALSERVERERROR,
      message: CHECKFINDALLMETHOD,
    });
  }
};

exports.saveTicket = async (req, res, next) => {
  const quantity = req.body.quantity;
  try {
    const result = await applyValidation({ quantity }, schema);
  } catch (error) {
    console.log(error);
    res.status(error.errorCode || FOURHUNDRED).json({
      status: FAIL,
      errorCode: BADREQUEST,
      message: error.message,
    });
    return;
  }

  try {
    const tickets = tambola.generateTickets(quantity * 6);
    const setOfTickets = tickets.map((ticket) => ({
      ticket: ticket._entries.flat().join(","),
    }));
    const response = await ticketModel.bulkCreate(setOfTickets);
    const data = makeResponse(response);
    res.status(TWOHUNREDONE).json({
      ticket: data,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(FIVEHUNDRED).json({
      status: FAIL,
      errorCode: INTERNALSERVERERROR,
      message: CHECKBULKCREATEMETHOD,
    });
  }
};
