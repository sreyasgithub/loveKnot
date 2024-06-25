const Joi = require("joi");

const userSchemaValidation = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ["com", "in"],
      },
    })
    .required(),

  password: Joi.string()
    .custom((value, helper) => {
      if (
        !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(value)
      ) {
        return helper.message(
          "password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long."
        );
      } else {
        return true;
      }
    })
    .required(),
});

module.exports = userSchemaValidation;
