const Joi = require("joi");

// Register Validation
function registerValidation(body) {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(4).max(50).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }).required(),
    repeat_password: Joi.string().valid(Joi.ref("password")).required(),
  });
  return schema.validate(body);
}

// Login Validation
function loginValidation(body) {
  const schema = Joi.object({
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  });
  return schema.validate(body);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
