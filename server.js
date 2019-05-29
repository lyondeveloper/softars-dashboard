//Imports of externals scripts
require('./config/config');
require('colors');
// require('./services/cache');

//Imports of libraries and frameworks
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const multer = require('multer');

//Routes
const users = require('./routes/api/users');
const projects = require('./routes/api/projects');
const profiles = require('./routes/api/profiles');
const all = require('./routes/all');

const app = express();

//Multer configuration
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toDateString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

//Global Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(multer({ storage: fileStorage, fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));

//Routes middlewares
app.use('/api/users', users);
app.use('/api/projects', projects);
app.use('/api/profiles', profiles);
app.use('/', all);

//Passport configuration
app.use(passport.initialize());
require('./config/passport')(passport);

mongoose.connect(process.env.MONGOURI, err => {
    if (err) throw new Error('Error connecting to MongoDB'.red);
    console.log('MongoDB connected'.green);
});

app.listen(process.env.PORT, () =>
    console.log(`Server running in port ${process.env.PORT}`.yellow)
);
