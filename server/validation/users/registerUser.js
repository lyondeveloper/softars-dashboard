const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function(data){
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isLength(data.name, { min: 2, max: 20 })) {
    errors.name = "Name must be between 2 and 20 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email field is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6 })) {
    errors.password = "Password must be 6 characters at least";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};