/**
 *
 * @param {object} object
 * @param {object} schema
 * @returns input object if data is ok otherwise throw error
 */

const applyValidation = async (object, schema) => {
  try {
    const validate = await schema.validateAsync(object);
    return validate;
  } catch (error) {
    error.errorCode = 400;
    error.message = error.message.replace(/"/g, "");
    throw error;
  }
};

/**
 *
 * @param {number} id
 * @param {string} setOfTicket
 * @returns take setofTicket
 */

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

/**
 *
 * @param {object} response
 * @returns take db response as input and return tambola ticket in required format
 */

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

module.exports = { applyValidation, makeResponse };
