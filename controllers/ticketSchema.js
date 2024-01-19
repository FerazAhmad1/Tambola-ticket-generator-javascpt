const Joi = require("joi");

const schema = Joi.object({
  quantity: Joi.number().integer().required().max(10),
});

module.exports = schema;
