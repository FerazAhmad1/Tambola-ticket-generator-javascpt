const joi = require("joi");

const schema = joi.object({
  limit: joi.number().integer().max(100),
  page: joi.number().integer(),
});

module.exports = schema;
