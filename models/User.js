const Mongoose = require('mongoose');

let Schema = Mongoose.Schema;

let validRoles = {
    values: ['admin', 'user'],
    message: '{VALUE} is not a valid role'
};

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

    role: {
        type: String,
        default: 'user',
        enum: validRoles
    },

    resetToken: String,
    resetTokenExpiration: Date,

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = Mongoose.model('user', UserSchema);
