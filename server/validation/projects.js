const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateProjectInput = data => {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.client = !isEmpty(data.client) ? data.client : "";
  data.url = !isEmpty(data.url) ? data.url : "";
  data.type = !isEmpty(data.type) ? data.type : "";
  data.date = !isEmpty(data.date) ? data.date : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (!Validator.isEmpty(data.url)) {
    if (!Validator.isURL(data.url)) {
      errors.url = "URL field is invalid";
    }
  }

  if (Validator.isEmpty(data.type)) {
    errors.type = "Type field is required";
  }

  if (Validator.isEmpty(data.date)) {
    errors.date = "Date field is required";
  }

  if (Validator.isEmpty(data.client)) {
    errors.client = "Client field is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  if (!Validator.isLength(data.description, { min: 5 })) {
    errors.description = "Description must be 5 characters at least";
  }

  return {
    errors,
    isNotValid: isEmpty(errors)
  };
};

module.exports = validateProjectInput;
