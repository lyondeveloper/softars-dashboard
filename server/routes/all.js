//Import of libraries and frameworks
const express = require("express");
const router = express.Router();
const passport = require("passport");
const path = require("path");

//@route GET /api/users/current
//@desc Get current user
//@access Private
router.get(
  "*",
    (req, res, next) => {
        res.sendFile(path.resolve('public', 'index.html'));
    }
);

module.exports = router;
