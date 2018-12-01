const Validator = require("validator");
const isEmpty = require("../is-empty");

const validateUpdateInput = data => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email fiels is required";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (!Validator.isLength(data.password, { min: 6 })) {
    errors.password = "Password must be 6 characters at least";
  }

  if (!Validator.isLength(data.name, { min: 2 })) {
    errors.name = "Name must be 2 characters at least";
  }

  return {
    errors,
    isNotValid: isEmpty(errors)
  };
};

module.exports = validateUpdateInput;
