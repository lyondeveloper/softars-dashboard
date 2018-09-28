//Imports of libraries and frameworks
const express = require('express');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

//Imports of externals scripts
require('./config/config');

//server configuration variables
let server = http.createServer(app);
let port = process.env.PORT;
let publicPath = path.resolve(__dirname, '../public');

//middlewares
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(require('./routes/api/route'));

mongoose.connect('mongodb://localhost:27017/softarsweb', (err) => {

    if (err) throw new Error("Error making the database connection");

    console.log(`Database online`);

});

server.listen(port, (err) => {

    if (err) throw new Error("Error making the server connection");

    console.log(`Server running in port ${port}`);

});