const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateProjectInput = data => {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.client = !isEmpty(data.client) ? data.client : "";

  if (!Validator.isLength(data.title, { min: 1, max: 10 })) {
    errors.title = "Title must be between 1 and 10 characters";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  if (!Validator.isLength(data.description, { min: 5 })) {
    errors.description = "Description must be 5 characters at least";
  }

  if (Validator.isEmpty(data.client)) {
    errors.client = "Client field is required";
  }

  return {
    errors,
    isNotValid: isEmpty(errors)
  };
};

module.exports = validateProjectInput;
