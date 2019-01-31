//Import of libraries and frameworks
const express = require("express");
const router = express.Router();
const passport = require("passport");

//@route GET /api/users/current
//@desc Get current user
//@access Private
router.get(
  "*",
    (req, res, next) => {
        //You can handle the request here
    }
);

module.exports = router;
