const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  handle: {
    type: String,
    required: true
  },

  profession: {
    type: [String],
    required: true
  },

  occupation: {
    type: String,
    required: true
  },

  website: {
    type: String
  },

  country: {
    type: String
  },

  bio: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
