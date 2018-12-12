//Import of libraries and frameworks
const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserController = require("../../controllers/UserController");


//@route POST /api/users/register
//@desc Create user
//@access Public
router.post("/register", (req, res) => {
  UserController.register(req, res);
});

//@route POST /api/users/login
//@desc Log in users
//@access Public
router.post("/login", (req, res) => {
  UserController.login(req, res);
});

//@route GET /api/users/current
//@desc Get current user
//@access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    UserController.getCurrentUser(req, res);
  }
);

//@route GET /api/users
//@desc Get all users
//@access Public
router.get("/", (req, res) => {
  UserController.getAll(req, res);
});

//@route PUT /api/users/update
//@desc Update user
//@access Private
router.put(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    UserController.update(req, res);
  }
);

//@route DELETE /api/users
//@desc Delete user
//@access Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    UserController.delete(req, res);
  }
);

module.exports = router;
