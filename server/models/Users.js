const Mongoose = require('mongoose');
const UniqueValidator = require('mongoose-unique-validator');

let Schema = Mongoose.Schema;

let validRoles = {

    values: ["ADMIN", "USER"],
    message: "{VALUE} is not a valid role"

}

let userSchema = new Schema({

    name: {

        type: String,
        required: [true, "The name is required"]

    },

    email: {

        type: String,
        unique: true,
        require: [true, "The email is required"]

    },

    password: {

        type: String,
        require: [true, "The password is required"]

    },

    status: {

        type: Boolean,
        require: false,
        default: true

    },

    role: {

        type: String,
        default: 'USER',
        enum: validRoles,
        required: false

    },

    img: {

        type: String,
        required: false

    },

    birthday: {

        type: String,
        required: true

    }

});


userSchema.methods.toJSON = function() {

    let user = this;

    userObject = user.toObject();

    delete userObject.password;

    return userObject;

}

userSchema.plugin(UniqueValidator, {message: "{PATH} must be unique"});

module.exports = Mongoose.model("Users", userSchema);