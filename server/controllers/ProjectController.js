require("../config/config");
const _ = require("underscore");
const Project = require("../models/Project");

//Input Validations
const validateCreateProjectInput = require("../validation/projects");

class ProjectController {
  //Method to create a project
  async create(req, res) {
    const { errors, isNotValid } = validateCreateProjectInput(req.body);

    if (!isNotValid) return res.status(400).json(errors);

    try {
      const { title, description, client, date, url } = req.body;
      const project = new Project({
        title,
        description,
        client,
        date,
        url,
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
    const { id } = req.params;

    try {
      const newData = _.pick(req.body, [
        "title",
        "description",
        "client",
        "date",
        "url"
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

const projectController = new ProjectController();

module.exports = projectController;
