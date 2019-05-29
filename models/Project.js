const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

    createdAt: {
        date: {
            type: Date
        },
        doneBy: {
            type: Schema.Types.String,
            ref: 'user'
        }
    },

    updatedAt: {
        date: {
            type: Date
        },
        doneBy: {
            type: Schema.Types.String,
            ref: 'user'
        }
    },

    url: {
        type: String,
        default: 'Here goes the URL if the project is a website...'
    },

    image: {
        type: String
    },

    type: {
        type: String
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = Project = mongoose.model('project', ProjectSchema);
