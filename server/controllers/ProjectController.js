require("../config/config");
const _ = require("underscore");
const Project = require("../models/Project");
// const gfs = require("../config/gfs").gfs;

//Input Validations
const InputValidation = require("../validation/InputValidation");

class ProjectController {
  //Method to create a project
  async create(req, res) {
    try {
      //Checking for input errors
      const { errors, isValid } = InputValidation.validateProjectInput(
        req.body
      );

      if (!isValid) return res.status(400).json(errors);

      //Creating the new user data and saving it to database, in case of errors, they will be pushed to the errors object to be handle in front-end
      const { title, description, client, date, url, type, img } = req.body;

      const project = new Project({
        title,
        description,
        client,
        date,
        url,
        type,
        user: req.user.id
      });

      await project.save();
      res.json(project);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  //Method to get all projects
  async getAll(req, res) {
    try {
      const projects = await Project.find().sort({ date: "descending" });
      res.json(projects);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  //Method to get a project by its ID
  async getById(req, res) {
    let errors = {};
    try {
      let id = req.params.id;
      const project = await Project.findById(id);

      res.json(project);
    } catch (e) {
      errors.notFound = "Project not found";
      return res.status(404).json(errors);
    }
  }

  //Method to update a project
  async update(req, res) {
    try {
      //Check for input fields
      const { errors, isValid } = InputValidation.validateProjectInput(
        req.body
      );

      if (!isValid) return res.status(400).json(errors);

      const { id } = req.params;

      //Creating new data and pushing it to collection
      const newData = _.pick(req.body, [
        "title",
        "description",
        "client",
        "date",
        "url",
        "type"
      ]);
      const project = await Project.findByIdAndUpdate(id, newData, {
        new: true
      });

      res.json(project);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  //Method to delete projects
  async delete(req, res) {
    const { id } = req.params;

    try {
      await Project.findByIdAndRemove(id);

      res.json({ success: true });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

module.exports = new ProjectController();
