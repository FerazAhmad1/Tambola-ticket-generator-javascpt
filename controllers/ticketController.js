const schema = require("./ticketSchema");
const ticketModel = require("../Models/ticketModel.js");
const tambola = require("tambola-generator").default;

const applyValidation = async (object, schema) => {
  try {
    const validate = await schema.validateAsync(object);
    return validate;
  } catch (error) {
    console.log("error message", error.message);
    error.errorCode = 400;
    error.message = error.message.replace(/"/g, "");
    throw error;
  }
};

const createtambola = (id, setOfTicket) => {
  let a = [];
  let b = [];
  let c = [];
  const arr = setOfTicket.split(",");

  for (let i = 0; i < arr.length; i++) {
    if (i >= 0 && i < 9) {
      a.push(arr[i]);
    } else if (i >= 9 && i < 18) {
      b.push(arr[i]);
    } else if (i >= 18) {
      c.push(arr[i]);
    }
  }

  return {
    [id]: [a, b, c],
  };
};

const makeResponse = (response) => {
  const allTickets = response.map((ticket) =>
    createtambola(ticket.dataValues.id, ticket.dataValues.ticket)
  );

  let ans = {};
  allTickets.forEach((ticket) => {
    ans = { ...ans, ...ticket };
  });
  return ans;
};

exports.fetchAll = (req, res, next) => {
  console.log("yes");

  console.log(tickets);
};

exports.saveTicket = async (req, res, next) => {
  const quantity = req.body.quantity;
  try {
    const result = await applyValidation({ quantity }, schema);
  } catch (error) {
    console.log(error);
    res.status(error.errorCode).json({
      status: "Fail",
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
    res.status(201).json({
      ticket: data,
    });
    return;
  } catch (error) {
    console.log(error);
  }
};
