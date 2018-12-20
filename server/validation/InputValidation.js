const Validator = require("validator");
const isEmpty = require("./is-empty");

class InputValidation {
  constructor() {
    this.errors = {};
  }

  //Login Input Validation
  validateLoginInput(data) {
    this.errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (Validator.isEmpty(data.email)) {
      this.errors.email = "Email field is required";
    }

    if (!Validator.isEmail(data.email)) {
      this.errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.password)) {
      this.errors.password = "Password field is required";
    }

    return {
      errors: this.errors,
      isValid: isEmpty(this.errors)
    };
  }

  //Registration input validation
  validateRegisterInput(data) {
    this.errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (!Validator.isLength(data.name, { min: 2, max: 20 })) {
      this.errors.name = "Name must be between 2 and 20 characters";
    }

    if (Validator.isEmpty(data.name)) {
      this.errors.name = "Name field is required";
    }

    if (Validator.isEmpty(data.email)) {
      this.errors.email = "Email field is required";
    }

    if (!Validator.isEmail(data.email)) {
      this.errors.email = "Email field is invalid";
    }

    if (Validator.isEmpty(data.password)) {
      this.errors.password = "Password field is required";
    }

    if (Validator.isEmpty(data.password2)) {
      this.errors.password2 = "Confirm password field is required";
    }

    if (!Validator.isLength(data.password, { min: 6 })) {
      this.errors.password = "Password must be 6 characters at least";
    }

    if (!Validator.equals(data.password, data.password2)) {
      this.errors.password = "Passwords must match";
    }

    return {
      errors: this.errors,
      isValid: isEmpty(this.errors)
    };
  }

  //Project Input Validation
  validateProjectInput(data) {
    this.errors = {};

    data.title = !isEmpty(data.title) ? data.title : "";
    data.description = !isEmpty(data.description) ? data.description : "";
    data.client = !isEmpty(data.client) ? data.client : "";
    data.url = !isEmpty(data.url) ? data.url : "";
    data.type = !isEmpty(data.type) ? data.type : "";
    data.date = !isEmpty(data.date) ? data.date : "";

    if (Validator.isEmpty(data.title)) {
      this.errors.title = "Title field is required";
    }

    if (!Validator.isEmpty(data.url)) {
      if (!Validator.isURL(data.url)) {
        this.errors.url = "URL field is invalid";
      }
    }

    if (Validator.isEmpty(data.type)) {
      this.errors.type = "Type field is required";
    }

    if (Validator.isEmpty(data.date)) {
      this.errors.date = "Date field is required";
    }

    if (Validator.isEmpty(data.client)) {
      this.errors.client = "Client field is required";
    }

    if (Validator.isEmpty(data.description)) {
      this.errors.description = "Description field is required";
    }

    if (!Validator.isLength(data.description, { min: 5 })) {
      this.errors.description = "Description must be 5 characters at least";
    }

    return {
      errors: this.errors,
      isValid: isEmpty(this.errors)
    };
  }
}

module.exports = new InputValidation();
