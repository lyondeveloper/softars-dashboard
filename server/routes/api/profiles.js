const express = require("express");
const router = express.Router();
const passport = require("passport");
const ProfileController = require("../../controllers/ProfileController");

//@route POST /api/profiles
//@desc Create profile if you don't have one, edit it if you do
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ProfileController.createOrEdit(req, res);
  }
);

module.exports = router;
