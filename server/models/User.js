const Mongoose = require("mongoose");

let Schema = Mongoose.Schema;

let UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    require: true
  },

  password: {
    type: String,
    require: true
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = Mongoose.model("user", UserSchema);
