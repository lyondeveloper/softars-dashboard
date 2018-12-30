require("../config/config");
const Project = require("../models/Project");

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

      const projectFields = {};

      projectFields.user = req.user.id;

      if (req.body.title) projectFields.title = req.body.title;
      if (req.body.description)
        projectFields.description = req.body.description;
      if (req.body.client) projectFields.client = req.body.client;
      if (req.body.url) projectFields.url = req.body.url;
      if (req.body.type) projectFields.type = req.body.type;
      if (req.body.date) projectFields.date = req.body.date;

      const project = new Project(projectFields);

      await project.save();

      res.json(project);
    } catch (error) {
      console.log(error);
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
    const errors = {};
    try {
      const id = req.params.id;
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

      const projectFields = {};

      if (req.body.title) projectFields.title = req.body.title;
      if (req.body.description)
        projectFields.description = req.body.description;
      if (req.body.client) projectFields.client = req.body.client;
      if (req.body.url) projectFields.url = req.body.url;
      if (req.body.type) projectFields.type = req.body.type;
      if (req.body.date) projectFields.date = req.body.date;

      const projectUpdated = await Project.findByIdAndUpdate(
        req.params.id,
        {
          $set: projectFields
        },
        {
          new: true
        }
      );

      res.json(projectUpdated);
    } catch (error) {
      console.log(error);
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
