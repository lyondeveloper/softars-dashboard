const Validator = require("validator");
const isEmpty = require("./is-empty");

class InputValidation {
  //Login Input Validation
  validateLoginInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (Validator.isEmpty(data.email)) {
      errors.email = "Email field is required";
    }

    if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.password)) {
      errors.password = "Password field is required";
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  }

  //Registration input validation
  validateRegisterInput(data) {
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
  }

  //Project Input Validation
  validateProjectInput(data) {
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
      isValid: isEmpty(errors)
    };
  }

  //Profile Input Validation
  validateProfileInput(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : "";
    data.website = !isEmpty(data.website) ? data.website : "";
    data.profession = !isEmpty(data.profession) ? data.profession : "";
    data.occupation = !isEmpty(data.occupation) ? data.occupation : "";
    data.bio = !isEmpty(data.bio) ? data.bio : "";
    data.country = !isEmpty(data.country) ? data.country : "";

    //Checking if fields are empty
    if (Validator.isEmpty(data.handle)) {
      errors.handle = "Handle field is required";
    }
    if (Validator.isEmpty(data.profession)) {
      errors.profession = "Profession field is required";
    }
    if (Validator.isEmpty(data.occupation)) {
      errors.occupation = "Occupation field is required";
    }

    //Checking for the length
    if (!Validator.isLength(data.handle, { min: 2 })) {
      errors.handle = "Handle field must be at least 2 characters";
    }
    if (!Validator.isLength(data.bio, { min: 10, max: 250 })) {
      errors.bio = "Bio field must be between 10 and 250 characters";
    }

    if (!Validator.isURL(data.website)) {
      errors.website = "Website field is invalid";
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
}

module.exports = new InputValidation();
