require("../config/config");

const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const _ = require("underscore");

//Input validations
const InputValidation = require("../validation/InputValidation");

class UserController {
  async register(req, res) {
    try {
      //Check input fields
      const { errors, isValid } = InputValidation.validateRegisterInput(
        req.body
      );

      if (!isValid) return res.status(400).json(errors);

      const user = await User.findOne({ email: req.body.email });

      //User already exist with that email
      if (user) {
        //Create user
        errors.email = "Email already exist";
        return res.status(400).json(errors);
      } else {
        const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          date: req.body.date
        });

        const newUser = await user.save();
        res.json({
          success: true,
          newUser
        });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async login(req, res) {
    //Check input fields
    const { errors, isValid } = InputValidation.validateLoginInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    try {
      //Finding User
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        errors.email = "Email incorrect";
        return res.status(404).json(errors);
      }

      //Comparing password
      const didMatch = await bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (didMatch) {
        //User matched
        const payload = {
          id: user.id,
          name: user.name
        };

        //Creating the JWT
        const token = await jwt.sign(payload, process.env.TOKEN_SEED, {
          expiresIn: process.env.TOKEN_EXPIRATION
        });

        res.json({ token: "Bearer " + token });
      } else {
        errors.password = "Password incorrect";
        return res.status(404).json(errors);
      }
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  getCurrentUser(req, res) {
    res.json({
      id: req.user.id,
      name: req.user.name,
      date: req.user.date,
      password: req.user.password
    });
  }

  async update(req, res) {
    try {
      //Grabbing the id from the params
      const id = req.params.id;
      const { errors, isValid } = InputValidation.validateRegisterInput(
        req.body
      );

      if (!isValid) return res.status(400).json(errors);

      //The new body to update the user's info
      let newData = _.pick(req.body, ["name", "email", "date"]);

      //Finding the user to update
      const user = await User.findByIdAndUpdate(id, newData, { new: true });

      //Checking if the user exist
      if (!user) {
        errors.userNotFound = "User could not be found";
        return res.status(404).json(errors);
      }

      res.json(user);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
}

module.exports = new UserController();
