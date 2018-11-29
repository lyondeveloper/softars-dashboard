const bcrypt = require("bcryptjs");
const User = require("../models/User");
const validateRegisterInput = require("../validation/register");

class UserController {
  create(req, res) {
    const { errors, isNotValid } = validateRegisterInput(req.body);

    if (!isNotValid) return res.status(400).json(errors);

    User.findOne({ email: req.body.email }, (error, user) => {
      if (user) {
        error.email = "Email already exist";
      } else {
        const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          date: req.body.date
        });

        user.save((error, user) => {
          if (error) console.log(error);

          res.json(user);
        });
      }
    });
  }

  getAll(req, res) {
    let from = req.query.from || 0;
    from = Number(from);
    let limit = req.query.limit || 5;
    limit = Number(limit);

    User.find({ status: true }, "name email status role birthday img")
      .skip(from)
      .limit(limit)
      .sort("name")
      .exec((err, usersDB) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
            message: "Error searching the users"
          });
        }

        User.count({ status: true }, (err, count) => {
          res.json({
            ok: true,
            users: usersDB,
            totalusers: count
          });
        });
      });
  }

  getByID(req, res) {
    let id = req.params.id;

    User.findById(id, (err, userDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
          message: "Error in the searching of the user, maybe the ID is invalid"
        });
      }

      if (!userDB) {
        return res.status(400).json({
          ok: false,
          err,
          message: "Maybe the user doesn't exist"
        });
      }

      res.json({
        ok: true,
        user: userDB
      });
    });
  }

  getByName(req, res) {
    let name = req.params.name;

    let regexp = new RegExp(name, "i");

    User.find({ name: regexp }).exec((err, userDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
          message: "Maybe there isn't a user with that name"
        });
      }

      if (!userDB) {
        return res.status(400).json({
          ok: false,
          err,
          message: "Maybe the user doesn't exist"
        });
      }

      res.json({
        ok: true,
        user: userDB
      });
    });
  }

  update(req, res) {
    let id = req.params.id;

    let body = _.pick(req.body, ["name", "email", "img", "role", "status"]);

    User.findByIdAndUpdate(id, body, { new: true }, (err, userUpdated) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
          message: "Maybe the ID doesn't exists"
        });
      }

      if (!userUpdated) {
        return res.status(400).json({
          ok: false,
          err,
          message: "Maybe the user doesn't exist"
        });
      }

      res.json({
        ok: true,
        userUpdated
      });
    });
  }

  delete(req, res) {
    let id = req.params.id;

    User.findByIdAndRemove(id, (err, userDeleted) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
          message: "Maybe the ID is invalid"
        });
      }

      if (!userDeleted) {
        return res.status(400).json({
          ok: false,
          err,
          message: "Maybe the user is already deleted"
        });
      }

      res.json({
        ok: true,
        userDeleted
      });
    });
  }
}

const userController = new UserController();

module.exports = userController;
