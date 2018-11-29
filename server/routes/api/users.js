//Import of libraries and frameworks
const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserController = require("../../controllers/UserController");

//@route POST /api/users/register
//@desc Create user
//@access Public
router.post("/register", (req, res) => {
  UserController.create(req, res);
});

/**
 * Get users
 */
router.get("/users", (req, res) => {});

/**
 * Get users by ID
 */
router.get("/users/:id", (req, res) => {});

/**
 * Get users by name
 */
router.get("/users/search-name/:name", (req, res) => {});

/**
 * Update a user
 */
router.put(
  "/users/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {}
);

/**
 *************
 * Delete a User
 *************
 */
router.delete("/users/:id", (req, res) => {});

module.exports = router;
