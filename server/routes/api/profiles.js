const express = require("express");
const router = express.Router();
const passport = require("passport");
const ProfileController = require("../../controllers/ProfileController");

//@route POST /api/profiles
//@desc Create profile if you don't have one, edit it if you do
//@access Private
router.post(
  "/createOrEdit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ProfileController.createOrEdit(req, res);
  }
);

//@route GET /api/profiles/current
//@desc Get all profiles
//@access Public
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ProfileController.getCurrentProfile(req, res);
  }
);

//@route GET /api/profiles
//@desc Get all profiles
//@access Public
router.get("/", (req, res) => {
  ProfileController.getAll(req, res);
});

//@route GET /api/profiles/handle
//@desc Get profile by handle
//@access Private
router.get(
  "/:handle",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ProfileController.getByHandle(req, res);
  }
);

//@route GET /api/profiles
//@desc Get all profiles
//@access Public
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ProfileController.delete(req, res);
  }
);

module.exports = router;
