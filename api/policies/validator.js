// Validate request body and query against a Joi schema
module.exports = validator = (req, res, next) => {
  const schema = require(`../validations/tasksValidations`);
  const { error } = schema.create.validate(req.body);
  if (error) {
    return res.badRequest({ err: error.details[0].message, status: 'error' });
  }
  return next();
};
