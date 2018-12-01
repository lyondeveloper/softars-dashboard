const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },

  client: {
    type: String,
    required: true
  },

  url: {
    type: String,
    default: "Here goes the URL if the project is a website..."
  },

  img: {
    type: String
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  }
});

module.exports = Project = Mongoose.model("project", ProjectSchema);
