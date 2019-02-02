const express = require("express");
const router = express.Router();
const ProjectController = require("../../controllers/ProjectController");
const passport = require("passport");
const checkRole = require("../../authentication/role");

//@route POST /api/projects/create
//@desc Create projects
//@access Private
router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        ProjectController.create(req, res);
    }
);

//@route GET /api/projects
//@desc Get all user projects
//@access Public
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        ProjectController.getAll(req, res);
    }
);

//@route GET /api/projects/:id
//@desc Get projects by its ID
//@access Public
router.get(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        ProjectController.getById(req, res);
    }
);

//@route PUT /api/projects/:id
//@desc Update projects
//@access Private
router.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        ProjectController.update(req, res);
    }
);

//@route DELETE /api/projects/:id
//@desc Delete projects
//@access Private
router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        ProjectController.delete(req, res);
    }
);

module.exports = router;
